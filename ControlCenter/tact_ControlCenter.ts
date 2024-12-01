import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from '@ton/core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadGetterTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type StdAddress = {
    $$type: 'StdAddress';
    workchain: bigint;
    address: bigint;
}

export function storeStdAddress(src: StdAddress) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.workchain, 8);
        b_0.storeUint(src.address, 256);
    };
}

export function loadStdAddress(slice: Slice) {
    let sc_0 = slice;
    let _workchain = sc_0.loadIntBig(8);
    let _address = sc_0.loadUintBig(256);
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

function loadTupleStdAddress(source: TupleReader) {
    let _workchain = source.readBigNumber();
    let _address = source.readBigNumber();
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

function loadGetterTupleStdAddress(source: TupleReader) {
    let _workchain = source.readBigNumber();
    let _address = source.readBigNumber();
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

function storeTupleStdAddress(source: StdAddress) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.workchain);
    builder.writeNumber(source.address);
    return builder.build();
}

function dictValueParserStdAddress(): DictionaryValue<StdAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStdAddress(src)).endCell());
        },
        parse: (src) => {
            return loadStdAddress(src.loadRef().beginParse());
        }
    }
}

export type VarAddress = {
    $$type: 'VarAddress';
    workchain: bigint;
    address: Slice;
}

export function storeVarAddress(src: VarAddress) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.workchain, 32);
        b_0.storeRef(src.address.asCell());
    };
}

export function loadVarAddress(slice: Slice) {
    let sc_0 = slice;
    let _workchain = sc_0.loadIntBig(32);
    let _address = sc_0.loadRef().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

function loadTupleVarAddress(source: TupleReader) {
    let _workchain = source.readBigNumber();
    let _address = source.readCell().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

function loadGetterTupleVarAddress(source: TupleReader) {
    let _workchain = source.readBigNumber();
    let _address = source.readCell().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

function storeTupleVarAddress(source: VarAddress) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.workchain);
    builder.writeSlice(source.address.asCell());
    return builder.build();
}

function dictValueParserVarAddress(): DictionaryValue<VarAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeVarAddress(src)).endCell());
        },
        parse: (src) => {
            return loadVarAddress(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Slice;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw.asCell());
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef().asSlice();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell().asSlice();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadGetterTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell().asSlice();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw.asCell());
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadGetterTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadGetterTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadGetterTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadGetterTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwner = {
    $$type: 'ChangeOwner';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwner(src: ChangeOwner) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2174598809, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwner(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2174598809) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwner(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadGetterTupleChangeOwner(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwner(source: ChangeOwner) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeOwner(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwner(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwnerOk = {
    $$type: 'ChangeOwnerOk';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwnerOk(src: ChangeOwnerOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(846932810, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwnerOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 846932810) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwnerOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadGetterTupleChangeOwnerOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwnerOk(source: ChangeOwnerOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwnerOk(): DictionaryValue<ChangeOwnerOk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeOwnerOk(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwnerOk(src.loadRef().beginParse());
        }
    }
}

export type Status = {
    $$type: 'Status';
    winner: bigint;
    totalMe: bigint;
    total: bigint;
    winnerRate: bigint;
    fee: bigint;
    pnl: bigint;
    total1: bigint;
    me1: bigint;
    total2: bigint;
    me2: bigint;
    total3: bigint;
    me3: bigint;
    total4: bigint;
    me4: bigint;
    total5: bigint;
    me5: bigint;
    total6: bigint;
    me6: bigint;
    total7: bigint;
    me7: bigint;
    total8: bigint;
    me8: bigint;
    total9: bigint;
    me9: bigint;
    total10: bigint;
    me10: bigint;
}

export function storeStatus(src: Status) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.winner, 257);
        b_0.storeInt(src.totalMe, 257);
        b_0.storeInt(src.total, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.winnerRate, 257);
        b_1.storeInt(src.fee, 257);
        b_1.storeInt(src.pnl, 257);
        let b_2 = new Builder();
        b_2.storeInt(src.total1, 257);
        b_2.storeInt(src.me1, 257);
        b_2.storeInt(src.total2, 257);
        let b_3 = new Builder();
        b_3.storeInt(src.me2, 257);
        b_3.storeInt(src.total3, 257);
        b_3.storeInt(src.me3, 257);
        let b_4 = new Builder();
        b_4.storeInt(src.total4, 257);
        b_4.storeInt(src.me4, 257);
        b_4.storeInt(src.total5, 257);
        let b_5 = new Builder();
        b_5.storeInt(src.me5, 257);
        b_5.storeInt(src.total6, 257);
        b_5.storeInt(src.me6, 257);
        let b_6 = new Builder();
        b_6.storeInt(src.total7, 257);
        b_6.storeInt(src.me7, 257);
        b_6.storeInt(src.total8, 257);
        let b_7 = new Builder();
        b_7.storeInt(src.me8, 257);
        b_7.storeInt(src.total9, 257);
        b_7.storeInt(src.me9, 257);
        let b_8 = new Builder();
        b_8.storeInt(src.total10, 257);
        b_8.storeInt(src.me10, 257);
        b_7.storeRef(b_8.endCell());
        b_6.storeRef(b_7.endCell());
        b_5.storeRef(b_6.endCell());
        b_4.storeRef(b_5.endCell());
        b_3.storeRef(b_4.endCell());
        b_2.storeRef(b_3.endCell());
        b_1.storeRef(b_2.endCell());
        b_0.storeRef(b_1.endCell());
    };
}

export function loadStatus(slice: Slice) {
    let sc_0 = slice;
    let _winner = sc_0.loadIntBig(257);
    let _totalMe = sc_0.loadIntBig(257);
    let _total = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _winnerRate = sc_1.loadIntBig(257);
    let _fee = sc_1.loadIntBig(257);
    let _pnl = sc_1.loadIntBig(257);
    let sc_2 = sc_1.loadRef().beginParse();
    let _total1 = sc_2.loadIntBig(257);
    let _me1 = sc_2.loadIntBig(257);
    let _total2 = sc_2.loadIntBig(257);
    let sc_3 = sc_2.loadRef().beginParse();
    let _me2 = sc_3.loadIntBig(257);
    let _total3 = sc_3.loadIntBig(257);
    let _me3 = sc_3.loadIntBig(257);
    let sc_4 = sc_3.loadRef().beginParse();
    let _total4 = sc_4.loadIntBig(257);
    let _me4 = sc_4.loadIntBig(257);
    let _total5 = sc_4.loadIntBig(257);
    let sc_5 = sc_4.loadRef().beginParse();
    let _me5 = sc_5.loadIntBig(257);
    let _total6 = sc_5.loadIntBig(257);
    let _me6 = sc_5.loadIntBig(257);
    let sc_6 = sc_5.loadRef().beginParse();
    let _total7 = sc_6.loadIntBig(257);
    let _me7 = sc_6.loadIntBig(257);
    let _total8 = sc_6.loadIntBig(257);
    let sc_7 = sc_6.loadRef().beginParse();
    let _me8 = sc_7.loadIntBig(257);
    let _total9 = sc_7.loadIntBig(257);
    let _me9 = sc_7.loadIntBig(257);
    let sc_8 = sc_7.loadRef().beginParse();
    let _total10 = sc_8.loadIntBig(257);
    let _me10 = sc_8.loadIntBig(257);
    return { $$type: 'Status' as const, winner: _winner, totalMe: _totalMe, total: _total, winnerRate: _winnerRate, fee: _fee, pnl: _pnl, total1: _total1, me1: _me1, total2: _total2, me2: _me2, total3: _total3, me3: _me3, total4: _total4, me4: _me4, total5: _total5, me5: _me5, total6: _total6, me6: _me6, total7: _total7, me7: _me7, total8: _total8, me8: _me8, total9: _total9, me9: _me9, total10: _total10, me10: _me10 };
}

function loadTupleStatus(source: TupleReader) {
    let _winner = source.readBigNumber();
    let _totalMe = source.readBigNumber();
    let _total = source.readBigNumber();
    let _winnerRate = source.readBigNumber();
    let _fee = source.readBigNumber();
    let _pnl = source.readBigNumber();
    let _total1 = source.readBigNumber();
    let _me1 = source.readBigNumber();
    let _total2 = source.readBigNumber();
    let _me2 = source.readBigNumber();
    let _total3 = source.readBigNumber();
    let _me3 = source.readBigNumber();
    let _total4 = source.readBigNumber();
    let _me4 = source.readBigNumber();
    source = source.readTuple();
    let _total5 = source.readBigNumber();
    let _me5 = source.readBigNumber();
    let _total6 = source.readBigNumber();
    let _me6 = source.readBigNumber();
    let _total7 = source.readBigNumber();
    let _me7 = source.readBigNumber();
    let _total8 = source.readBigNumber();
    let _me8 = source.readBigNumber();
    let _total9 = source.readBigNumber();
    let _me9 = source.readBigNumber();
    let _total10 = source.readBigNumber();
    let _me10 = source.readBigNumber();
    return { $$type: 'Status' as const, winner: _winner, totalMe: _totalMe, total: _total, winnerRate: _winnerRate, fee: _fee, pnl: _pnl, total1: _total1, me1: _me1, total2: _total2, me2: _me2, total3: _total3, me3: _me3, total4: _total4, me4: _me4, total5: _total5, me5: _me5, total6: _total6, me6: _me6, total7: _total7, me7: _me7, total8: _total8, me8: _me8, total9: _total9, me9: _me9, total10: _total10, me10: _me10 };
}

function loadGetterTupleStatus(source: TupleReader) {
    let _winner = source.readBigNumber();
    let _totalMe = source.readBigNumber();
    let _total = source.readBigNumber();
    let _winnerRate = source.readBigNumber();
    let _fee = source.readBigNumber();
    let _pnl = source.readBigNumber();
    let _total1 = source.readBigNumber();
    let _me1 = source.readBigNumber();
    let _total2 = source.readBigNumber();
    let _me2 = source.readBigNumber();
    let _total3 = source.readBigNumber();
    let _me3 = source.readBigNumber();
    let _total4 = source.readBigNumber();
    let _me4 = source.readBigNumber();
    let _total5 = source.readBigNumber();
    let _me5 = source.readBigNumber();
    let _total6 = source.readBigNumber();
    let _me6 = source.readBigNumber();
    let _total7 = source.readBigNumber();
    let _me7 = source.readBigNumber();
    let _total8 = source.readBigNumber();
    let _me8 = source.readBigNumber();
    let _total9 = source.readBigNumber();
    let _me9 = source.readBigNumber();
    let _total10 = source.readBigNumber();
    let _me10 = source.readBigNumber();
    return { $$type: 'Status' as const, winner: _winner, totalMe: _totalMe, total: _total, winnerRate: _winnerRate, fee: _fee, pnl: _pnl, total1: _total1, me1: _me1, total2: _total2, me2: _me2, total3: _total3, me3: _me3, total4: _total4, me4: _me4, total5: _total5, me5: _me5, total6: _total6, me6: _me6, total7: _total7, me7: _me7, total8: _total8, me8: _me8, total9: _total9, me9: _me9, total10: _total10, me10: _me10 };
}

function storeTupleStatus(source: Status) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.winner);
    builder.writeNumber(source.totalMe);
    builder.writeNumber(source.total);
    builder.writeNumber(source.winnerRate);
    builder.writeNumber(source.fee);
    builder.writeNumber(source.pnl);
    builder.writeNumber(source.total1);
    builder.writeNumber(source.me1);
    builder.writeNumber(source.total2);
    builder.writeNumber(source.me2);
    builder.writeNumber(source.total3);
    builder.writeNumber(source.me3);
    builder.writeNumber(source.total4);
    builder.writeNumber(source.me4);
    builder.writeNumber(source.total5);
    builder.writeNumber(source.me5);
    builder.writeNumber(source.total6);
    builder.writeNumber(source.me6);
    builder.writeNumber(source.total7);
    builder.writeNumber(source.me7);
    builder.writeNumber(source.total8);
    builder.writeNumber(source.me8);
    builder.writeNumber(source.total9);
    builder.writeNumber(source.me9);
    builder.writeNumber(source.total10);
    builder.writeNumber(source.me10);
    return builder.build();
}

function dictValueParserStatus(): DictionaryValue<Status> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStatus(src)).endCell());
        },
        parse: (src) => {
            return loadStatus(src.loadRef().beginParse());
        }
    }
}

export type CBet = {
    $$type: 'CBet';
    turtleNumber: bigint;
}

export function storeCBet(src: CBet) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3090833964, 32);
        b_0.storeUint(src.turtleNumber, 32);
    };
}

export function loadCBet(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3090833964) { throw Error('Invalid prefix'); }
    let _turtleNumber = sc_0.loadUintBig(32);
    return { $$type: 'CBet' as const, turtleNumber: _turtleNumber };
}

function loadTupleCBet(source: TupleReader) {
    let _turtleNumber = source.readBigNumber();
    return { $$type: 'CBet' as const, turtleNumber: _turtleNumber };
}

function loadGetterTupleCBet(source: TupleReader) {
    let _turtleNumber = source.readBigNumber();
    return { $$type: 'CBet' as const, turtleNumber: _turtleNumber };
}

function storeTupleCBet(source: CBet) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.turtleNumber);
    return builder.build();
}

function dictValueParserCBet(): DictionaryValue<CBet> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCBet(src)).endCell());
        },
        parse: (src) => {
            return loadCBet(src.loadRef().beginParse());
        }
    }
}

export type Bet = {
    $$type: 'Bet';
    turtleNumber: bigint;
    address: Address;
}

export function storeBet(src: Bet) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2725592788, 32);
        b_0.storeUint(src.turtleNumber, 32);
        b_0.storeAddress(src.address);
    };
}

export function loadBet(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2725592788) { throw Error('Invalid prefix'); }
    let _turtleNumber = sc_0.loadUintBig(32);
    let _address = sc_0.loadAddress();
    return { $$type: 'Bet' as const, turtleNumber: _turtleNumber, address: _address };
}

function loadTupleBet(source: TupleReader) {
    let _turtleNumber = source.readBigNumber();
    let _address = source.readAddress();
    return { $$type: 'Bet' as const, turtleNumber: _turtleNumber, address: _address };
}

function loadGetterTupleBet(source: TupleReader) {
    let _turtleNumber = source.readBigNumber();
    let _address = source.readAddress();
    return { $$type: 'Bet' as const, turtleNumber: _turtleNumber, address: _address };
}

function storeTupleBet(source: Bet) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.turtleNumber);
    builder.writeAddress(source.address);
    return builder.build();
}

function dictValueParserBet(): DictionaryValue<Bet> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeBet(src)).endCell());
        },
        parse: (src) => {
            return loadBet(src.loadRef().beginParse());
        }
    }
}

export type History = {
    $$type: 'History';
    number: bigint;
    total: bigint;
    data: Dictionary<Address, bigint>;
}

export function storeHistory(src: History) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2070303689, 32);
        b_0.storeUint(src.number, 32);
        b_0.storeInt(src.total, 257);
        b_0.storeDict(src.data, Dictionary.Keys.Address(), Dictionary.Values.BigInt(257));
    };
}

export function loadHistory(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2070303689) { throw Error('Invalid prefix'); }
    let _number = sc_0.loadUintBig(32);
    let _total = sc_0.loadIntBig(257);
    let _data = Dictionary.load(Dictionary.Keys.Address(), Dictionary.Values.BigInt(257), sc_0);
    return { $$type: 'History' as const, number: _number, total: _total, data: _data };
}

function loadTupleHistory(source: TupleReader) {
    let _number = source.readBigNumber();
    let _total = source.readBigNumber();
    let _data = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.BigInt(257), source.readCellOpt());
    return { $$type: 'History' as const, number: _number, total: _total, data: _data };
}

function loadGetterTupleHistory(source: TupleReader) {
    let _number = source.readBigNumber();
    let _total = source.readBigNumber();
    let _data = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.BigInt(257), source.readCellOpt());
    return { $$type: 'History' as const, number: _number, total: _total, data: _data };
}

function storeTupleHistory(source: History) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.number);
    builder.writeNumber(source.total);
    builder.writeCell(source.data.size > 0 ? beginCell().storeDictDirect(source.data, Dictionary.Keys.Address(), Dictionary.Values.BigInt(257)).endCell() : null);
    return builder.build();
}

function dictValueParserHistory(): DictionaryValue<History> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeHistory(src)).endCell());
        },
        parse: (src) => {
            return loadHistory(src.loadRef().beginParse());
        }
    }
}

export type CPnl = {
    $$type: 'CPnl';
    id: bigint;
}

export function storeCPnl(src: CPnl) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(100692031, 32);
        b_0.storeInt(src.id, 257);
    };
}

export function loadCPnl(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 100692031) { throw Error('Invalid prefix'); }
    let _id = sc_0.loadIntBig(257);
    return { $$type: 'CPnl' as const, id: _id };
}

function loadTupleCPnl(source: TupleReader) {
    let _id = source.readBigNumber();
    return { $$type: 'CPnl' as const, id: _id };
}

function loadGetterTupleCPnl(source: TupleReader) {
    let _id = source.readBigNumber();
    return { $$type: 'CPnl' as const, id: _id };
}

function storeTupleCPnl(source: CPnl) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.id);
    return builder.build();
}

function dictValueParserCPnl(): DictionaryValue<CPnl> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCPnl(src)).endCell());
        },
        parse: (src) => {
            return loadCPnl(src.loadRef().beginParse());
        }
    }
}

export type Pnl = {
    $$type: 'Pnl';
    id: bigint;
    address: Address;
}

export function storePnl(src: Pnl) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(588751220, 32);
        b_0.storeInt(src.id, 257);
        b_0.storeAddress(src.address);
    };
}

export function loadPnl(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 588751220) { throw Error('Invalid prefix'); }
    let _id = sc_0.loadIntBig(257);
    let _address = sc_0.loadAddress();
    return { $$type: 'Pnl' as const, id: _id, address: _address };
}

function loadTuplePnl(source: TupleReader) {
    let _id = source.readBigNumber();
    let _address = source.readAddress();
    return { $$type: 'Pnl' as const, id: _id, address: _address };
}

function loadGetterTuplePnl(source: TupleReader) {
    let _id = source.readBigNumber();
    let _address = source.readAddress();
    return { $$type: 'Pnl' as const, id: _id, address: _address };
}

function storeTuplePnl(source: Pnl) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.id);
    builder.writeAddress(source.address);
    return builder.build();
}

function dictValueParserPnl(): DictionaryValue<Pnl> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storePnl(src)).endCell());
        },
        parse: (src) => {
            return loadPnl(src.loadRef().beginParse());
        }
    }
}

export type Withdraw = {
    $$type: 'Withdraw';
    id: bigint;
}

export function storeWithdraw(src: Withdraw) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(465817403, 32);
        b_0.storeInt(src.id, 257);
    };
}

export function loadWithdraw(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 465817403) { throw Error('Invalid prefix'); }
    let _id = sc_0.loadIntBig(257);
    return { $$type: 'Withdraw' as const, id: _id };
}

function loadTupleWithdraw(source: TupleReader) {
    let _id = source.readBigNumber();
    return { $$type: 'Withdraw' as const, id: _id };
}

function loadGetterTupleWithdraw(source: TupleReader) {
    let _id = source.readBigNumber();
    return { $$type: 'Withdraw' as const, id: _id };
}

function storeTupleWithdraw(source: Withdraw) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.id);
    return builder.build();
}

function dictValueParserWithdraw(): DictionaryValue<Withdraw> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeWithdraw(src)).endCell());
        },
        parse: (src) => {
            return loadWithdraw(src.loadRef().beginParse());
        }
    }
}

export type All = {
    $$type: 'All';
    amount: bigint;
}

export function storeAll(src: All) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1291309529, 32);
        b_0.storeInt(src.amount, 257);
    };
}

export function loadAll(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1291309529) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadIntBig(257);
    return { $$type: 'All' as const, amount: _amount };
}

function loadTupleAll(source: TupleReader) {
    let _amount = source.readBigNumber();
    return { $$type: 'All' as const, amount: _amount };
}

function loadGetterTupleAll(source: TupleReader) {
    let _amount = source.readBigNumber();
    return { $$type: 'All' as const, amount: _amount };
}

function storeTupleAll(source: All) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserAll(): DictionaryValue<All> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeAll(src)).endCell());
        },
        parse: (src) => {
            return loadAll(src.loadRef().beginParse());
        }
    }
}

export type Turtle$Data = {
    $$type: 'Turtle$Data';
    id: bigint;
    total: bigint;
    items: Dictionary<bigint, History>;
    owner: Address;
    winner: bigint;
    winnerRate: bigint;
    fee: bigint;
}

export function storeTurtle$Data(src: Turtle$Data) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.id, 257);
        b_0.storeInt(src.total, 257);
        b_0.storeDict(src.items, Dictionary.Keys.BigInt(257), dictValueParserHistory());
        b_0.storeAddress(src.owner);
        let b_1 = new Builder();
        b_1.storeInt(src.winner, 257);
        b_1.storeInt(src.winnerRate, 257);
        b_1.storeInt(src.fee, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadTurtle$Data(slice: Slice) {
    let sc_0 = slice;
    let _id = sc_0.loadIntBig(257);
    let _total = sc_0.loadIntBig(257);
    let _items = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserHistory(), sc_0);
    let _owner = sc_0.loadAddress();
    let sc_1 = sc_0.loadRef().beginParse();
    let _winner = sc_1.loadIntBig(257);
    let _winnerRate = sc_1.loadIntBig(257);
    let _fee = sc_1.loadIntBig(257);
    return { $$type: 'Turtle$Data' as const, id: _id, total: _total, items: _items, owner: _owner, winner: _winner, winnerRate: _winnerRate, fee: _fee };
}

function loadTupleTurtle$Data(source: TupleReader) {
    let _id = source.readBigNumber();
    let _total = source.readBigNumber();
    let _items = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserHistory(), source.readCellOpt());
    let _owner = source.readAddress();
    let _winner = source.readBigNumber();
    let _winnerRate = source.readBigNumber();
    let _fee = source.readBigNumber();
    return { $$type: 'Turtle$Data' as const, id: _id, total: _total, items: _items, owner: _owner, winner: _winner, winnerRate: _winnerRate, fee: _fee };
}

function loadGetterTupleTurtle$Data(source: TupleReader) {
    let _id = source.readBigNumber();
    let _total = source.readBigNumber();
    let _items = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserHistory(), source.readCellOpt());
    let _owner = source.readAddress();
    let _winner = source.readBigNumber();
    let _winnerRate = source.readBigNumber();
    let _fee = source.readBigNumber();
    return { $$type: 'Turtle$Data' as const, id: _id, total: _total, items: _items, owner: _owner, winner: _winner, winnerRate: _winnerRate, fee: _fee };
}

function storeTupleTurtle$Data(source: Turtle$Data) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.id);
    builder.writeNumber(source.total);
    builder.writeCell(source.items.size > 0 ? beginCell().storeDictDirect(source.items, Dictionary.Keys.BigInt(257), dictValueParserHistory()).endCell() : null);
    builder.writeAddress(source.owner);
    builder.writeNumber(source.winner);
    builder.writeNumber(source.winnerRate);
    builder.writeNumber(source.fee);
    return builder.build();
}

function dictValueParserTurtle$Data(): DictionaryValue<Turtle$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTurtle$Data(src)).endCell());
        },
        parse: (src) => {
            return loadTurtle$Data(src.loadRef().beginParse());
        }
    }
}

export type ControlCenter$Data = {
    $$type: 'ControlCenter$Data';
    fee: bigint;
    owner: Address;
}

export function storeControlCenter$Data(src: ControlCenter$Data) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.fee, 257);
        b_0.storeAddress(src.owner);
    };
}

export function loadControlCenter$Data(slice: Slice) {
    let sc_0 = slice;
    let _fee = sc_0.loadIntBig(257);
    let _owner = sc_0.loadAddress();
    return { $$type: 'ControlCenter$Data' as const, fee: _fee, owner: _owner };
}

function loadTupleControlCenter$Data(source: TupleReader) {
    let _fee = source.readBigNumber();
    let _owner = source.readAddress();
    return { $$type: 'ControlCenter$Data' as const, fee: _fee, owner: _owner };
}

function loadGetterTupleControlCenter$Data(source: TupleReader) {
    let _fee = source.readBigNumber();
    let _owner = source.readAddress();
    return { $$type: 'ControlCenter$Data' as const, fee: _fee, owner: _owner };
}

function storeTupleControlCenter$Data(source: ControlCenter$Data) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.fee);
    builder.writeAddress(source.owner);
    return builder.build();
}

function dictValueParserControlCenter$Data(): DictionaryValue<ControlCenter$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeControlCenter$Data(src)).endCell());
        },
        parse: (src) => {
            return loadControlCenter$Data(src.loadRef().beginParse());
        }
    }
}

 type ControlCenter_init_args = {
    $$type: 'ControlCenter_init_args';
}

function initControlCenter_init_args(src: ControlCenter_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
    };
}

async function ControlCenter_init() {
    const __code = Cell.fromBase64('te6ccgECGwEABXIAART/APSkE/S88sgLAQIBYgIDAtzQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxa2zzy4ILI+EMBzH8BygBZAoEBAc8AASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFsntVBcEAgEgDxAE7AGSMH/gcCHXScIflTAg1wsf3iCCELg6Yiy6jpUw0x8BghC4OmIsuvLggdMfATHbPH/gIIIQBgBwP7qOmDDTHwGCEAYAcD+68uCBgQEB1wABMds8f+AgghAbw887uo6VMNMfAYIQG8PPO7ry4IGBAQHXAAEx4CAFBgcIAuSCAI4YIcIA8vSCAO85IcEL8vT4I4IBUYCpBPhDAds8XHBZyHABywFzAcsBcAHLABLMzMn5AMhyAcsBcAHLABLKB8v/ydAg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCI+EJQBAH4QW8kE18DJ6ECcgIaCQKo+EMh2zxccFnIcAHLAXMBywFwAcsAEszMyfkAyHIBywFwAcsAEsoHy//J0CDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4Ij4QhT4QW8kE18DAnICGgoD6lnbPPhDI9s8XHBZyHABywFzAcsBcAHLABLMzMn5AMhyAcsBcAHLABLKB8v/ydAg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCI+EFvJBNfA3IHyAGCEBvDzztYyx+BAQHPAMlFQBA3QXB/BgUEQTPbPDABfwsaDQPKghBM99HZuo8oMNMfAYIQTPfR2bry4IGBAQHXAAExWds8+EJQA3J/VSBtbW3bPDABf+CCEJRqmLa6jqfTHwGCEJRqmLa68uCB0z8BMcgBghCv+Q9XWMsfyz/J+EIBcG3bPH/gMHALDQwBcshZghCidT7UUAPLH8sfASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFslEMH8GBQRBM9s8MA0BeMhZghAjF6F0UAPLH4EBAc8AASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFslEMH8GBQRBM9s8MA0AEvhCUhDHBfLghAE8bW0ibrOZWyBu8tCAbyIBkTLiECRwAwSAQlAj2zwwDQHKyHEBygFQBwHKAHABygJQBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAD+gJwAcpoI26zkX+TJG6z4pczMwFwAcoA4w0hbrOcfwHKAAEgbvLQgAHMlTFwAcoA4skB+wgOAJh/AcoAyHABygBwAcoAJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4iRus51/AcoABCBu8tCAUATMljQDcAHKAOJwAcoAAn8BygACyVjMAhG+KO7Z5tnjYQwXEQIBIBITAAIgAhO7vE2zxY2zxsIYFxQCAUgVFgGM+EMB2zxwWchwAcsBcwHLAXABywASzMzJ+QDIcgHLAXABywASygfL/8nQINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiBoAEbCvu1E0NIAAYAIRsjF2zzbPGwhgFxgBhO1E0NQB+GPSAAGOJ4EBAdcA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiBJsEuAw+CjXCwqDCbry4InbPBkBnPgjggFRgKkE+EMB2zxwWchwAcsBcwHLAXABywASzMzJ+QDIcgHLAXABywASygfL/8nQINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiBoADoIK+vCA+EIAaAHQ9AQwbQGCAJF1AYAQ9A9vofLghwGCAJF1IgKAEPQXyAHI9ADJAcxwAcoAWAGBAQHPAMk=');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initControlCenter_init_args({ $$type: 'ControlCenter_init_args' })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const ControlCenter_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack underflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    11: { message: `'Unknown' error` },
    12: { message: `Fatal error` },
    13: { message: `Out of gas error` },
    14: { message: `Virtualization error` },
    32: { message: `Action list is invalid` },
    33: { message: `Action list is too long` },
    34: { message: `Action is invalid or not supported` },
    35: { message: `Invalid source address in outbound message` },
    36: { message: `Invalid destination address in outbound message` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    39: { message: `Outbound message does not fit into a cell after rewriting` },
    40: { message: `Cannot process a message` },
    41: { message: `Library reference is null` },
    42: { message: `Library change action error` },
    43: { message: `Exceeded maximum number of cells in the library or the maximum depth of the Merkle tree` },
    50: { message: `Account state size exceeded limits` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
    18136: { message: `not finished` },
    36376: { message: `little number` },
    61241: { message: `big number` },
}

const ControlCenter_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"StdAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":8}},{"name":"address","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"VarAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":32}},{"name":"address","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwner","header":2174598809,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwnerOk","header":846932810,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Status","header":null,"fields":[{"name":"winner","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"totalMe","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"total","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"winnerRate","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"fee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"pnl","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"total1","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"me1","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"total2","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"me2","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"total3","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"me3","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"total4","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"me4","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"total5","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"me5","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"total6","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"me6","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"total7","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"me7","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"total8","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"me8","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"total9","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"me9","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"total10","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"me10","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"CBet","header":3090833964,"fields":[{"name":"turtleNumber","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"Bet","header":2725592788,"fields":[{"name":"turtleNumber","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"History","header":2070303689,"fields":[{"name":"number","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"total","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"data","type":{"kind":"dict","key":"address","value":"int"}}]},
    {"name":"CPnl","header":100692031,"fields":[{"name":"id","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"Pnl","header":588751220,"fields":[{"name":"id","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Withdraw","header":465817403,"fields":[{"name":"id","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"All","header":1291309529,"fields":[{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"Turtle$Data","header":null,"fields":[{"name":"id","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"total","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"items","type":{"kind":"dict","key":"int","value":"History","valueFormat":"ref"}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"winner","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"winnerRate","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"fee","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"ControlCenter$Data","header":null,"fields":[{"name":"fee","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}}]},
]

const ControlCenter_getters: ABIGetter[] = [
    {"name":"tournamentActive","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"tournamentAddress","arguments":[{"name":"id","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"owner","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
]

export const ControlCenter_getterMapping: { [key: string]: string } = {
    'tournamentActive': 'getTournamentActive',
    'tournamentAddress': 'getTournamentAddress',
    'owner': 'getOwner',
}

const ControlCenter_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"CBet"}},
    {"receiver":"internal","message":{"kind":"typed","type":"CPnl"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Withdraw"}},
    {"receiver":"internal","message":{"kind":"typed","type":"All"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class ControlCenter implements Contract {
    
    static async init() {
        return await ControlCenter_init();
    }
    
    static async fromInit() {
        const init = await ControlCenter_init();
        const address = contractAddress(0, init);
        return new ControlCenter(address, init);
    }
    
    static fromAddress(address: Address) {
        return new ControlCenter(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  ControlCenter_types,
        getters: ControlCenter_getters,
        receivers: ControlCenter_receivers,
        errors: ControlCenter_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: CBet | CPnl | Withdraw | All | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'CBet') {
            body = beginCell().store(storeCBet(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'CPnl') {
            body = beginCell().store(storeCPnl(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Withdraw') {
            body = beginCell().store(storeWithdraw(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'All') {
            body = beginCell().store(storeAll(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getTournamentActive(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('tournamentActive', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getTournamentAddress(provider: ContractProvider, id: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(id);
        let source = (await provider.get('tournamentAddress', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getOwner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('owner', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
}