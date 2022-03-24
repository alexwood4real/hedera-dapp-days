import React from "react";
import operator from "../../config.js";
import { Client, AccountId, PrivateKey, TokenMintTransaction } from "@hashgraph/sdk";

async function tokenMintFcn(tId) {
	//Configure the Hedera client...
	const operatorId = AccountId.fromString(operator.id);
	const operatorKey = PrivateKey.fromString(operator.pb_key);
	const client = Client.forTestnet().setOperator(operatorId, operatorKey);

	//Add code to mint HTS tokens...
	const tokenMintTx = new TokenMintTransaction()
	.setTokenId(tId)
	.setAmount(100)
	.freezeWith(client);
	const tokenMintSign = await tokenMintTx.sign(operatorKey);
	const tokenMintSubmit = await tokenMintSign.execute(client);
	const tokenMintRec = await tokenMintSubmit.getRecord(client);
	const supply = tokenMintRec
	.receipt
	.totalSupply;

	return supply;
}

export default tokenMintFcn;
