# decentAI (decentralizedAI)

## Problem

## Solution

## Notes

This would be the modfied dfx.json to upload the model in src/assets.
Info about the model: https://www.kaggle.com/models/tensorflow/spam-detection/frameworks/tfJs?select=group1-shard1of1.bin
Choose this because it's a really lightweight model, due to the current 90Mb limitation to the files under "assets"
Only 90kB.

{
    "canisters": {
        "decentAI": {
            "type": "custom",
            "main": "src/index.ts",
            "candid": "src/index.did",
            "build": "npx azle decentAI",
            "wasm": ".azle/decentAI/decentAI.wasm",
            "assets": [["src/assets/archive/group1-shard1of1.bin", "models"], ["src/assets/archive/labels.txt", "models"], ["src/assets/archive/model.json", "models"], ["src/assets/archive/vocab", "models"]],
            "gzip": true
        }
    }
}

## How to Run:
Follow the steps at: https://github.com/carlosarturoceron/azle/blob/main/examples/hello_world/README.md

Built with <3 at ETH 5 de mayo

### Current Issue

I need to not use fetch to load tensorflow model. Looking in to it.

```
Call was rejected:
Request ID: d71e4f71016557c8c162c46b03600c3e20e771b6d23356b55fc7d0ee1b523b43
Reject code: 5
Reject text: Canister bkyz2-fmaaa-aaaaa-qaaaq-cai trapped explicitly: Uncaught TypeError: cannot read property 'fetch' of undefined at HTTPRequest (azle_main:71968)
at http (azle_main:72110)
at browserHTTPRequest (azle_main:72113)
at loadLayersModel (azle_main:82892)
at <anonymous> (azle_main:113218)
at getResult (azle_main:61649)
at executeMethod (azle_main:61623)
at <anonymous> (azle_main:61688)
```