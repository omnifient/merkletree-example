import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";
import {ethers} from "ethers";

import data from './addresses.json' assert { type: 'json' };
// console.log(data);

// create leaves from user addresses
const leaves = data.map((x) => ethers.solidityPackedKeccak256(["address"], [x]));
console.log("leaves");
console.log(leaves);

// create the Merkle tree
const tree = new MerkleTree(leaves, keccak256, { sort: true });
console.log("tree");
console.log(tree.toString());

const root = tree.getHexRoot();
console.log("root", root.toString());

const proofs = leaves.map(leaf => tree.getHexProof(leaf));
console.log("hex proofs ", proofs);
console.log("proofs array", proofs.flat());
