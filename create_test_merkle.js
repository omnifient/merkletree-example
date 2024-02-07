import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";
import {ethers} from "ethers";

// alice, bob, charlie
const al_data = [
  "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
  "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",
  //"0x90F79bf6EB2c4f870365E785982E1f101E93b906",
  "0xf3b059c887172f2cc52b5e77EE3b2C8B3A32E6eF",
  "0x4714B0124D466af4A0937AEEcA2626e3809fC66A",
  "0xF9f9375755F07B29D453B541B6BD6ad5a7184468",
  "0xfa2336eCA18b9BC384144Ad7f29E2137EE0564D1"
];
// const wl_data = [
//   "0x20FcD9DfD9b848da499C2a925Fb3ace5deEF5C2C",
//   "0x49a3Aab8EBe80725646937b9E9f6f8b4e9867bfe",
//   "0x984886312107a9ae23B8290D6C1D519A737283A2",
//   "0x56323930C7ae07510bE22F2cbBDe4C173a908242",
//   "0x39409e325de39E4bBd753Bd2ee49b46Abb39cf7d",
//   "0x54941dc116cFfcCC4393EEd1Fd1B2B0fa3ce1210"
// ];

function createMerkleStuff(data) {
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
}

console.log("------------------------ AL");
createMerkleStuff(al_data);

//console.log("\n\n\n");
//
//console.log("------------------------ WL");
//createMerkleStuff(wl_data);
