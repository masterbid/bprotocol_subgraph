// import { Address, BigInt, ethereum } from "@graphprotocol/graph-ts"
// import { 
//     Transaction,
//     Approval, 
//     Token,
//     AccountLiquidity,
//     Account,
//     Delegate,
//     Vote,
//     Mint,
//     Proposal,
//     Voted,
//     VoteCancelled,
//     Executed,
//     User,
//     Queued
// } from "../../generated/schema"
// import {
//     NewProposal as NewproposalEvent,
//     Voted as VotedEvent,
//     VoteCancelled as VoteCancelledEvent,
//     Queued as QueuedEvent,
//     Executed as ExecutedEvent
// } from "../../generated/templates/BproGovernance/Migrate"
// import {
// BPRO,
// Approval as ApprovalEvent,
// DelegateChanged as DelegateChangedEvent,
// DelegateVotesChanged as DelegateVotesChangedEvent,
// MinterChanged as MinterChangedEvent,
// Transfer as TransferEvent
// } from "../../generated/BPRO/BPRO"
// import { ERC20 } from '../../generated/BPRO/ERC20'

// export const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000'

// export function getOrCreateAccount(address: Address): Account {
//     let accountHex = address.toHexString()
//     let account = Account.load(accountHex)
//     if (account != null) {
//         return account as Account
//     }

//     account = new Account(accountHex)
//     account.votes = account.id
//     account.delegate = account.id
//     account.save()
//     return account as Account
//     // let accountInstance = BPRO.bind(event.address)
//     // let tryBalance = accountInstance.try_balanceOf(address)
//     // if(!tryBalance.reverted){
//     //     account.balance = tryBalance.value
//     // }
//     // let tryAllowance =  accountInstance.try_allowance(event.address, address)
//     // if(!tryAllowance.reverted){
//     //     account.allowance = tryAllowance.value
//     // }
//     // let tryAccountVotes = accountInstance.try_getCurrentVotes(address)
//     // if(!tryAccountVotes.reverted){
//     //     account.votes = tryAccountVotes.value
//     // }
//     // let tryNumberOfCheckPoints = accountInstance.try_numCheckpoints(address)
//     // if(!tryNumberOfCheckPoints.reverted){
//     //     account.numberOfCheckPoints = tryNumberOfCheckPoints.value
//     // }
//     // let tryGetDelegate = accountInstance.try_delegates(address)
//     // if(!tryGetDelegate.reverted){
//     //     account.delegate = tryGetDelegate.value
//     // }
    
// }

// export function getOrAddDelegate(event: ethereum.Event, address: Address): Delegate {
//     let delegateAddressHex = address.toHexString()
//     let delegate = Delegate.load(delegateAddressHex)
//     if(delegate != null){
//         return delegate as Delegate
//     }
    
// }

// export function getOrAddVotes(event: ethereum.Event, address: Address): Vote {
//     let voteAddresshex = address.toHexString()
//     let vote = Vote.load(voteAddresshex)
//     if(vote != null){
//         return vote as Vote
//     }
//     vote = new Vote(voteAddresshex)
//     let voteInstance = BPRO.bind(event.address)
//     let tryPreviousVote = voteInstance.try_getPriorVotes(address, event.block.number.minus(BigInt.fromI32(1)))
//     if(!tryPreviousVote.reverted){
//         vote.previousVote = tryPreviousVote.value
//     }
//     let tryCurrentVote = voteInstance.try_getCurrentVotes(address)
//     if(!tryCurrentVote.reverted){
//         vote.currentVote = tryCurrentVote.value
//     }
//     vote.save()
//     return vote as Vote
// }

// export function getOrCreateToken(event: ethereum.Event, address: Address): Token {
//     let addressHex = address.toHexString()
//     let token = Token.load(addressHex)
//     if (token != null) {
//         return token as Token
//     }

//     token = new Token(addressHex)
//     let tokenInstance = BPRO.bind(address)
//     let tryName = tokenInstance.try_name()
//     if (!tryName.reverted) {
//         token.name = tryName.value
//     }
//     let trySymbol = tokenInstance.try_symbol()
//     if (!trySymbol.reverted) {
//         token.symbol = trySymbol.value
//     }
//     let tryDecimals = tokenInstance.try_decimals()
//     if (!tryDecimals.reverted) {
//         token.decimals = tryDecimals.value
//     }
//     token.blockNumber = event.block.number
//     token.timestamp = event.block.timestamp
//     token.save()
//     return token as Token
// }

// export function getOrCreateProposal(proposalId: BigInt, owner: Address): Proposal {
//     let proposalIdHex = proposalId.toHexString()
//     let proposal = Proposal.load(proposalIdHex)
//     if(proposal != null){
//         return proposal as Proposal
//     }
//     proposal = new Proposal(proposalIdHex)
//     let user = getOrCreateUser(owner).id
//     proposal.owner = user
//     proposal.queued = false
//     proposal.executed = false
//     proposal.save()
//     return proposal as Proposal
// }

// export function getOrCreateUser(address: Address): User {
//     let userId = address.toHexString()
//     let user = User.load(userId)
//     if(user != null){
//         return user as User
//     }
//     user = new User(userId)
//     user.save()
//     return user as User
// }

// export function getOrCreateVoted(proposalId: BigInt, user: Address, score: BigInt): Voted {
//     let votedId = proposalId.toHexString()
//     let voted = Voted.load(votedId)
//     if(voted != null){
//         return voted as Voted
//     }
//     voted = new Voted(votedId)
//     voted.user = getOrCreateUser(user).id
//     voted.score = score
// }

import { BigDecimal, Bytes, Address, ethereum } from '@graphprotocol/graph-ts'
import { BPRO } from '../../generated/BPRO/BPRO'

import { Account, AccountBalance, AccountBalanceSnapshot, Delegate, Token, DelegateVote } from '../../generated/schema'

import { toDecimal, ONE, ZERO } from '../helpers/numbers'

export function getOrCreateToken(event: ethereum.Event, address: Address): Token {
  let addressHex = address.toHexString()
  let token = Token.load(addressHex)
  if (token != null) {
      return token as Token
  }

  token = new Token(addressHex)
  token.address = address
  let tokenInstance = BPRO.bind(address)
  let tryName = tokenInstance.try_name()
  if (!tryName.reverted) {
      token.name = tryName.value
  }
  let trySymbol = tokenInstance.try_symbol()
  if (!trySymbol.reverted) {
      token.symbol = trySymbol.value
  }
  
  let tryDecimals = tokenInstance.try_decimals()
  if (!tryDecimals.reverted) {
    token.decimals = tryDecimals.value
  }
  token.eventCount = ZERO
  token.mintEventCount = ZERO
  token.transferEventCount = ZERO
  
  let initialSupply = tokenInstance.try_totalSupply()
  token.totalSupply = initialSupply.reverted ? ZERO.toBigDecimal() : toDecimal(initialSupply.value, token.decimals)
  token.totalMinted = ZERO.toBigDecimal()
  token.totalTransferred = ZERO.toBigDecimal()
  token.save()
  return token as Token
}

export function getOrCreateAccount(accountAddress: Bytes): Account {
  let accountId = accountAddress.toHex()
  let existingAccount = Account.load(accountId)

  if (existingAccount != null) {
    return existingAccount as Account
  }

  let newAccount = new Account(accountId)
  newAccount.address = accountAddress
  newAccount.delegate = null
  
  return newAccount
}

function getOrCreateAccountBalance(account: Account, token: Token): AccountBalance {
  let balanceId = account.id.concat('-').concat(token.id)
  let previousBalance = AccountBalance.load(balanceId)

  if (previousBalance != null) {
    return previousBalance as AccountBalance
  }

  let newBalance = new AccountBalance(balanceId)
  newBalance.account = account.id
  newBalance.token = token.id
  newBalance.amount = ZERO.toBigDecimal()
  
  return newBalance
}

export function getOrCreateDelegate(delegator: Address, delegate: Address ): Delegate {
    let id = delegate.toHexString()
    let delegateInstance = Delegate.load(id)
    if(delegateInstance != null){
        return delegateInstance as Delegate
    }
    delegateInstance = new Delegate(id)
    delegateInstance.address = delegate
    let newDelegator = getOrCreateAccount(delegator)
    newDelegator.save()
    delegateInstance.delegator = newDelegator.id
    delegateInstance.vote = null
    
    return delegateInstance as Delegate
}

export function increaseAccountBalance(account: Account, token: Token, amount: BigDecimal): AccountBalance {
  let balance = getOrCreateAccountBalance(account, token)
  balance.amount = balance.amount.plus(amount)
  
  return balance
}

export function decreaseAccountBalance(account: Account, token: Token, amount: BigDecimal): AccountBalance {
  let balance = getOrCreateAccountBalance(account, token)
  balance.amount = balance.amount.minus(amount)
  
  return balance
}

export function saveAccountBalanceSnapshot(balance: AccountBalance, eventId: string, event: ethereum.Event): void {
  let snapshot = new AccountBalanceSnapshot(balance.id.concat('-').concat(event.block.timestamp.toString()))
  snapshot.account = balance.account
  snapshot.token = balance.token
  snapshot.amount = balance.amount

  snapshot.block = event.block.number
  snapshot.transaction = event.transaction.hash
  snapshot.timestamp = event.block.timestamp

  snapshot.event = eventId

  snapshot.save()
}


