// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Address,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class Account extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Account entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Account entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Account", id.toString(), this);
  }

  static load(id: string): Account | null {
    return store.get("Account", id) as Account | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get address(): Bytes {
    let value = this.get("address");
    return value.toBytes();
  }

  set address(value: Bytes) {
    this.set("address", Value.fromBytes(value));
  }

  get delegate(): string | null {
    let value = this.get("delegate");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set delegate(value: string | null) {
    if (value === null) {
      this.unset("delegate");
    } else {
      this.set("delegate", Value.fromString(value as string));
    }
  }

  get balances(): Array<string> {
    let value = this.get("balances");
    return value.toStringArray();
  }

  set balances(value: Array<string>) {
    this.set("balances", Value.fromStringArray(value));
  }
}

export class AccountBalance extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save AccountBalance entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save AccountBalance entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("AccountBalance", id.toString(), this);
  }

  static load(id: string): AccountBalance | null {
    return store.get("AccountBalance", id) as AccountBalance | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get account(): string {
    let value = this.get("account");
    return value.toString();
  }

  set account(value: string) {
    this.set("account", Value.fromString(value));
  }

  get token(): string {
    let value = this.get("token");
    return value.toString();
  }

  set token(value: string) {
    this.set("token", Value.fromString(value));
  }

  get amount(): BigDecimal {
    let value = this.get("amount");
    return value.toBigDecimal();
  }

  set amount(value: BigDecimal) {
    this.set("amount", Value.fromBigDecimal(value));
  }

  get block(): BigInt | null {
    let value = this.get("block");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set block(value: BigInt | null) {
    if (value === null) {
      this.unset("block");
    } else {
      this.set("block", Value.fromBigInt(value as BigInt));
    }
  }

  get modified(): BigInt | null {
    let value = this.get("modified");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set modified(value: BigInt | null) {
    if (value === null) {
      this.unset("modified");
    } else {
      this.set("modified", Value.fromBigInt(value as BigInt));
    }
  }

  get transaction(): Bytes | null {
    let value = this.get("transaction");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set transaction(value: Bytes | null) {
    if (value === null) {
      this.unset("transaction");
    } else {
      this.set("transaction", Value.fromBytes(value as Bytes));
    }
  }
}

export class AccountBalanceSnapshot extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(
      id !== null,
      "Cannot save AccountBalanceSnapshot entity without an ID"
    );
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save AccountBalanceSnapshot entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("AccountBalanceSnapshot", id.toString(), this);
  }

  static load(id: string): AccountBalanceSnapshot | null {
    return store.get(
      "AccountBalanceSnapshot",
      id
    ) as AccountBalanceSnapshot | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get account(): string {
    let value = this.get("account");
    return value.toString();
  }

  set account(value: string) {
    this.set("account", Value.fromString(value));
  }

  get token(): string {
    let value = this.get("token");
    return value.toString();
  }

  set token(value: string) {
    this.set("token", Value.fromString(value));
  }

  get amount(): BigDecimal {
    let value = this.get("amount");
    return value.toBigDecimal();
  }

  set amount(value: BigDecimal) {
    this.set("amount", Value.fromBigDecimal(value));
  }

  get event(): string | null {
    let value = this.get("event");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set event(value: string | null) {
    if (value === null) {
      this.unset("event");
    } else {
      this.set("event", Value.fromString(value as string));
    }
  }

  get block(): BigInt | null {
    let value = this.get("block");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set block(value: BigInt | null) {
    if (value === null) {
      this.unset("block");
    } else {
      this.set("block", Value.fromBigInt(value as BigInt));
    }
  }

  get modified(): BigInt | null {
    let value = this.get("modified");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set modified(value: BigInt | null) {
    if (value === null) {
      this.unset("modified");
    } else {
      this.set("modified", Value.fromBigInt(value as BigInt));
    }
  }

  get transaction(): Bytes | null {
    let value = this.get("transaction");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set transaction(value: Bytes | null) {
    if (value === null) {
      this.unset("transaction");
    } else {
      this.set("transaction", Value.fromBytes(value as Bytes));
    }
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }
}

export class Token extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Token entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Token entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Token", id.toString(), this);
  }

  static load(id: string): Token | null {
    return store.get("Token", id) as Token | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get address(): Bytes {
    let value = this.get("address");
    return value.toBytes();
  }

  set address(value: Bytes) {
    this.set("address", Value.fromBytes(value));
  }

  get decimals(): i32 {
    let value = this.get("decimals");
    return value.toI32();
  }

  set decimals(value: i32) {
    this.set("decimals", Value.fromI32(value));
  }

  get name(): string {
    let value = this.get("name");
    return value.toString();
  }

  set name(value: string) {
    this.set("name", Value.fromString(value));
  }

  get symbol(): string {
    let value = this.get("symbol");
    return value.toString();
  }

  set symbol(value: string) {
    this.set("symbol", Value.fromString(value));
  }

  get eventCount(): BigInt {
    let value = this.get("eventCount");
    return value.toBigInt();
  }

  set eventCount(value: BigInt) {
    this.set("eventCount", Value.fromBigInt(value));
  }

  get mintEventCount(): BigInt {
    let value = this.get("mintEventCount");
    return value.toBigInt();
  }

  set mintEventCount(value: BigInt) {
    this.set("mintEventCount", Value.fromBigInt(value));
  }

  get transferEventCount(): BigInt {
    let value = this.get("transferEventCount");
    return value.toBigInt();
  }

  set transferEventCount(value: BigInt) {
    this.set("transferEventCount", Value.fromBigInt(value));
  }

  get totalSupply(): BigDecimal {
    let value = this.get("totalSupply");
    return value.toBigDecimal();
  }

  set totalSupply(value: BigDecimal) {
    this.set("totalSupply", Value.fromBigDecimal(value));
  }

  get totalMinted(): BigDecimal {
    let value = this.get("totalMinted");
    return value.toBigDecimal();
  }

  set totalMinted(value: BigDecimal) {
    this.set("totalMinted", Value.fromBigDecimal(value));
  }

  get totalTransferred(): BigDecimal {
    let value = this.get("totalTransferred");
    return value.toBigDecimal();
  }

  set totalTransferred(value: BigDecimal) {
    this.set("totalTransferred", Value.fromBigDecimal(value));
  }

  get events(): Array<string> {
    let value = this.get("events");
    return value.toStringArray();
  }

  set events(value: Array<string>) {
    this.set("events", Value.fromStringArray(value));
  }
}

export class MintEvent extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save MintEvent entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save MintEvent entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("MintEvent", id.toString(), this);
  }

  static load(id: string): MintEvent | null {
    return store.get("MintEvent", id) as MintEvent | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get token(): string {
    let value = this.get("token");
    return value.toString();
  }

  set token(value: string) {
    this.set("token", Value.fromString(value));
  }

  get amount(): BigDecimal {
    let value = this.get("amount");
    return value.toBigDecimal();
  }

  set amount(value: BigDecimal) {
    this.set("amount", Value.fromBigDecimal(value));
  }

  get sender(): Bytes {
    let value = this.get("sender");
    return value.toBytes();
  }

  set sender(value: Bytes) {
    this.set("sender", Value.fromBytes(value));
  }

  get minter(): Bytes {
    let value = this.get("minter");
    return value.toBytes();
  }

  set minter(value: Bytes) {
    this.set("minter", Value.fromBytes(value));
  }

  get destination(): Bytes {
    let value = this.get("destination");
    return value.toBytes();
  }

  set destination(value: Bytes) {
    this.set("destination", Value.fromBytes(value));
  }

  get block(): BigInt {
    let value = this.get("block");
    return value.toBigInt();
  }

  set block(value: BigInt) {
    this.set("block", Value.fromBigInt(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get transaction(): Bytes {
    let value = this.get("transaction");
    return value.toBytes();
  }

  set transaction(value: Bytes) {
    this.set("transaction", Value.fromBytes(value));
  }
}

export class TransferEvent extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save TransferEvent entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save TransferEvent entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("TransferEvent", id.toString(), this);
  }

  static load(id: string): TransferEvent | null {
    return store.get("TransferEvent", id) as TransferEvent | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get token(): string {
    let value = this.get("token");
    return value.toString();
  }

  set token(value: string) {
    this.set("token", Value.fromString(value));
  }

  get amount(): BigDecimal {
    let value = this.get("amount");
    return value.toBigDecimal();
  }

  set amount(value: BigDecimal) {
    this.set("amount", Value.fromBigDecimal(value));
  }

  get sender(): Bytes {
    let value = this.get("sender");
    return value.toBytes();
  }

  set sender(value: Bytes) {
    this.set("sender", Value.fromBytes(value));
  }

  get source(): Bytes {
    let value = this.get("source");
    return value.toBytes();
  }

  set source(value: Bytes) {
    this.set("source", Value.fromBytes(value));
  }

  get destination(): Bytes {
    let value = this.get("destination");
    return value.toBytes();
  }

  set destination(value: Bytes) {
    this.set("destination", Value.fromBytes(value));
  }

  get block(): BigInt {
    let value = this.get("block");
    return value.toBigInt();
  }

  set block(value: BigInt) {
    this.set("block", Value.fromBigInt(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get transaction(): Bytes {
    let value = this.get("transaction");
    return value.toBytes();
  }

  set transaction(value: Bytes) {
    this.set("transaction", Value.fromBytes(value));
  }
}

export class ApprovalEvent extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save ApprovalEvent entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save ApprovalEvent entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("ApprovalEvent", id.toString(), this);
  }

  static load(id: string): ApprovalEvent | null {
    return store.get("ApprovalEvent", id) as ApprovalEvent | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get owner(): string {
    let value = this.get("owner");
    return value.toString();
  }

  set owner(value: string) {
    this.set("owner", Value.fromString(value));
  }

  get spender(): string {
    let value = this.get("spender");
    return value.toString();
  }

  set spender(value: string) {
    this.set("spender", Value.fromString(value));
  }

  get amount(): BigDecimal {
    let value = this.get("amount");
    return value.toBigDecimal();
  }

  set amount(value: BigDecimal) {
    this.set("amount", Value.fromBigDecimal(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get transaction(): Bytes {
    let value = this.get("transaction");
    return value.toBytes();
  }

  set transaction(value: Bytes) {
    this.set("transaction", Value.fromBytes(value));
  }
}

export class Delegate extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Delegate entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Delegate entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Delegate", id.toString(), this);
  }

  static load(id: string): Delegate | null {
    return store.get("Delegate", id) as Delegate | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get address(): Bytes {
    let value = this.get("address");
    return value.toBytes();
  }

  set address(value: Bytes) {
    this.set("address", Value.fromBytes(value));
  }

  get delegator(): string {
    let value = this.get("delegator");
    return value.toString();
  }

  set delegator(value: string) {
    this.set("delegator", Value.fromString(value));
  }

  get vote(): string | null {
    let value = this.get("vote");
    if (value === null || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set vote(value: string | null) {
    if (value === null) {
      this.unset("vote");
    } else {
      this.set("vote", Value.fromString(value as string));
    }
  }
}

export class DelegateVote extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save DelegateVote entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save DelegateVote entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("DelegateVote", id.toString(), this);
  }

  static load(id: string): DelegateVote | null {
    return store.get("DelegateVote", id) as DelegateVote | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get delegate(): string {
    let value = this.get("delegate");
    return value.toString();
  }

  set delegate(value: string) {
    this.set("delegate", Value.fromString(value));
  }

  get newVoteBalance(): BigInt {
    let value = this.get("newVoteBalance");
    return value.toBigInt();
  }

  set newVoteBalance(value: BigInt) {
    this.set("newVoteBalance", Value.fromBigInt(value));
  }

  get previousVoteBalance(): BigInt {
    let value = this.get("previousVoteBalance");
    return value.toBigInt();
  }

  set previousVoteBalance(value: BigInt) {
    this.set("previousVoteBalance", Value.fromBigInt(value));
  }
}

export class MinterChange extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save MinterChange entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save MinterChange entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("MinterChange", id.toString(), this);
  }

  static load(id: string): MinterChange | null {
    return store.get("MinterChange", id) as MinterChange | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get currentMinter(): string {
    let value = this.get("currentMinter");
    return value.toString();
  }

  set currentMinter(value: string) {
    this.set("currentMinter", Value.fromString(value));
  }

  get newMinter(): string {
    let value = this.get("newMinter");
    return value.toString();
  }

  set newMinter(value: string) {
    this.set("newMinter", Value.fromString(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }

  get transaction(): Bytes {
    let value = this.get("transaction");
    return value.toBytes();
  }

  set transaction(value: Bytes) {
    this.set("transaction", Value.fromBytes(value));
  }
}

export class DelegateChange extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save DelegateChange entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save DelegateChange entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("DelegateChange", id.toString(), this);
  }

  static load(id: string): DelegateChange | null {
    return store.get("DelegateChange", id) as DelegateChange | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get delegator(): string {
    let value = this.get("delegator");
    return value.toString();
  }

  set delegator(value: string) {
    this.set("delegator", Value.fromString(value));
  }

  get currentDelegate(): string {
    let value = this.get("currentDelegate");
    return value.toString();
  }

  set currentDelegate(value: string) {
    this.set("currentDelegate", Value.fromString(value));
  }

  get newDelegate(): string {
    let value = this.get("newDelegate");
    return value.toString();
  }

  set newDelegate(value: string) {
    this.set("newDelegate", Value.fromString(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }
}
