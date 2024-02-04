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

