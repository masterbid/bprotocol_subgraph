import { Address, BigInt, BigDecimal, Bytes, ethereum } from "@graphprotocol/graph-ts"
import {
  BPRO,
  Approval,
  DelegateChanged,
  DelegateVotesChanged,
  MinterChanged,
  Transfer
} from "../../generated/BPRO/BPRO"

import { 
  DelegateVote,
  DelegateChange,
  MinterChange,
  Token,
  MintEvent,
  TransferEvent,
  ApprovalEvent,
  Delegate
 } from "../../generated/schema"
import {
  decreaseAccountBalance,
  getOrCreateAccount,
  getOrCreateToken,
  getOrCreateDelegate,
  increaseAccountBalance,
  saveAccountBalanceSnapshot,
} from "./core"

import { toDecimal, ONE, ZERO } from '../helpers/numbers'

const GENESIS_ADDRESS = '0x0000000000000000000000000000000000000000'


export function handleApproval(event: Approval): void {
  let token = getOrCreateToken(event, event.address)
  let approval = ApprovalEvent.load(event.transaction.from.toHex())
  if (approval == null) {
    approval = new ApprovalEvent(event.transaction.from.toHex())
    let owner = getOrCreateAccount(event.params.owner)
    owner.save()
    approval.owner = owner.id
    let spender = getOrCreateAccount(event.params.spender)
    spender.save()
    approval.spender = spender.id
    approval.amount = toDecimal(event.params.amount, token.decimals)
    approval.timestamp = event.block.timestamp
    approval.transaction = event.transaction.hash
    approval.save()
  }
}

export function handleDelegateChanged(event: DelegateChanged): void {
  let id = event.params.fromDelegate.toHexString().concat('-').concat(event.params.toDelegate.toHexString())
  let delegate = DelegateChange.load(id)
  if(delegate == null){
    delegate = new DelegateChange(id)
    let delegator = getOrCreateAccount(event.params.delegator)
    let getDelegate = getOrCreateDelegate(event.params.delegator, event.params.toDelegate)
    getDelegate.save()
    delegator.delegate = getDelegate.id
    delegator.save()
    delegate.delegator = delegator.id
    let currentDelegate = getOrCreateAccount(event.params.fromDelegate)
    currentDelegate.save()
    delegate.currentDelegate = currentDelegate.id
    let newDelegate = getOrCreateAccount(event.params.toDelegate)
    newDelegate.save()
    delegate.newDelegate = newDelegate.id
    delegate.timestamp = event.block.timestamp
    delegate.save()
  }
}

export function handleDelegateVotesChanged(event: DelegateVotesChanged): void {
  let delegateId = event.params.delegate.toHexString()
  let delegate = Delegate.load(delegateId)
  let delegateVote = DelegateVote.load(delegateId)
  if(delegate != null){ 
    if(delegateVote != null){
      delegate.vote = delegateVote.id
      delegate.save()
    }
    
    delegateVote = new DelegateVote(delegateId)
    delegateVote.delegate = delegate.id
    delegateVote.previousVoteBalance = event.params.previousBalance
    delegateVote.newVoteBalance = event.params.newBalance
    delegateVote.save()
  }
}

export function handleMinterChanged(event: MinterChanged): void {
  let id = event.params.minter.toHexString().concat('-').concat(event.params.newMinter.toHexString())
  let minter = MinterChange.load(id)
  if(minter == null){
    minter = new MinterChange(id)
    let currentMinter = getOrCreateAccount(event.params.minter)
    currentMinter.save()
    minter.currentMinter = currentMinter.id
    let newMinter = getOrCreateAccount(event.params.newMinter)
    newMinter.save()
    minter.newMinter = newMinter.id
    minter.timestamp = event.block.timestamp
    minter.transaction = event.transaction.hash
    minter.save()
  }
  
}

export function handleTransfer(event: Transfer): void {
  let token = getOrCreateToken(event, event.address)
  if (token != null) {
    let amount = toDecimal(event.params.amount, token.decimals)
    let isMint = event.params.from.toHex() == GENESIS_ADDRESS
    let isTransfer = !isMint

    // Update token event logs
    let eventEntityId: string

    if (isMint) {
      let eventEntity = handleMintEvent(token, amount, event.params.to, event)

      eventEntityId = eventEntity.id
    } else if (isTransfer) {
      let eventEntity = handleTransferEvent(token, amount, event.params.from, event.params.to, event)

      eventEntityId = eventEntity.id
    }

    // Updates balances of accounts
    if (isTransfer) {
      let sourceAccount = getOrCreateAccount(event.params.from)

      let accountBalance = decreaseAccountBalance(sourceAccount, token as Token, amount)
      accountBalance.block = event.block.number
      accountBalance.modified = event.block.timestamp
      accountBalance.transaction = event.transaction.hash

      sourceAccount.save()
      accountBalance.save()

      // To provide information about evolution of account balances
      saveAccountBalanceSnapshot(accountBalance, eventEntityId, event)
    }

    if (isTransfer || isMint) {
      let destinationAccount = getOrCreateAccount(event.params.to)

      let accountBalance = increaseAccountBalance(destinationAccount, token as Token, amount)
      accountBalance.block = event.block.number
      accountBalance.modified = event.block.timestamp
      accountBalance.transaction = event.transaction.hash

      destinationAccount.save()
      accountBalance.save()

      // To provide information about evolution of account balances
      saveAccountBalanceSnapshot(accountBalance, eventEntityId, event)
    }

  }

}

function handleMintEvent(token: Token | null, amount: BigDecimal, destination: Bytes, event: ethereum.Event): MintEvent {
  let mintEvent = new MintEvent(event.transaction.hash.toHex().concat('-').concat(event.logIndex.toString()))
  mintEvent.token = event.address.toHex()
  mintEvent.amount = amount
  mintEvent.sender = event.transaction.from
  mintEvent.destination = destination
  mintEvent.minter = event.transaction.from

  mintEvent.block = event.block.number
  mintEvent.timestamp = event.block.timestamp
  mintEvent.transaction = event.transaction.hash

  mintEvent.save()

  // Track total token supply/minted
  if (token != null) {
    token.eventCount = token.eventCount.plus(ONE)
    token.mintEventCount = token.mintEventCount.plus(ONE)
    token.totalSupply = token.totalSupply.plus(amount)
    token.totalMinted = token.totalMinted.plus(amount)

    token.save()
  }
  return mintEvent
}

function handleTransferEvent(
  token: Token | null,
  amount: BigDecimal,
  source: Bytes,
  destination: Bytes,
  event: ethereum.Event,
): TransferEvent {
  let transferEvent = new TransferEvent(event.transaction.hash.toHex().concat('-').concat(event.logIndex.toString()))
  transferEvent.token = event.address.toHex()
  transferEvent.amount = amount
  transferEvent.sender = source
  transferEvent.source = source
  transferEvent.destination = destination

  transferEvent.block = event.block.number
  transferEvent.timestamp = event.block.timestamp
  transferEvent.transaction = event.transaction.hash

  transferEvent.save()

  // Track total token transferred
  if (token != null) {
    token.eventCount = token.eventCount.plus(ONE)
    token.transferEventCount = token.transferEventCount.plus(ONE)
    token.totalTransferred = token.totalTransferred.plus(amount)

    token.save()
  }

  return transferEvent
  
}
