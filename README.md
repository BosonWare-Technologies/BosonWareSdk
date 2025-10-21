# @bosonware/sdk

A TypeScript SDK for the BosonWare API (Store + Web3).  
Made with ❤️, caffeine, and a hint of chaos by the BosonWare Team.

## Installation

````bash
npm install @bosonware/sdk
# or
yarn add @bosonware/sdk

## Usage
```ts
import { BosonWareAPISDK } from "../src/";

const sdk = new BosonWareAPISDK("https://api.bosonware.org");

// Get products
const products = await sdk.getProductList(1);

console.log(products.result.products);

// Get assets
const assets = await sdk.getAssets({
    address: "3mdMuNXNmTNJvDc3tbYnAGhdVepS5Frt1g5bApLXfChp",
    includePrices: true,
});

console.log(assets.result.assets);

// Get token prices
const prices = await sdk.getPrices([
    "So11111111111111111111111111111111111111112",
    "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
]);

console.log(prices.result.prices);

````
