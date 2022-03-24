import React from "react";
import operator from "../../config.js";
import { Client, AccountId, PrivateKey, TokenCreateTransaction } from "@hashgraph/sdk";

async function tokenCreateFcn() {
	//Configure the Hedera client...
	const operatorId = AccountId.fromString(operator.id);
	const operatorKey = PrivateKey.fromString(operator.pb_key);
	const client = Client.forTestnet().setOperator(operatorId, operatorKey);

	//Add code to create the HTS token...
	// default is fungible
	// creates a transaction that gives birth to token
	const tokenCreateTx = new TokenCreateTransaction()
	.setTokenName("dAppDayToken")
	.setTokenSymbol("DDT")
	.setTreasuryAccountId(operatorId)
	.setInitialSupply(100)
	.setDecimals(0)
	.setSupplyKey(operatorKey)
	.freezeWith(client);

	// signs, submit to hedera, get info about txn
	const tokenCreateSign = await tokenCreateTx.sign(operatorKey);
	const tokenCreateSubmit = await tokenCreateSign.execute(client);
	const tokenCreateRec = await tokenCreateSubmit.getRecord(client); // id, account, reciept itself 

	const tId = tokenCreateRec.receipt.tokenId;
	const supply = tokenCreateTx._initialSupply.low;

	return [tId, supply];

}

export default tokenCreateFcn;
