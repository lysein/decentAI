# decentAI (decentralizedAI)

## How can we think about AI?
AI: software that presents one or more human capabilities.

Seeing, reading, writing, speaking, analyzing, deciding.

## The Problem: it's centralized

If you want to run a large scale AI without having the tech knowledge on how to train & deploy ML models for prediction you rely on consuming them trough something like this:

https://bigCorpo.com/coolName/humanLikeBehavior (And they reserve the right of admission)

This is a HUGE problem:

Because AI is a catalyst for productivity. The problem is that one individual/company/nation can use AI and another cannot. 

* The AI community is aware of this and that's why most of the models are opensource.

In the most popular AI platform there are more than 10,000 pre-trained open source models.

The models are already opensource!

`How can we decentralize them?`

## Solution

The proposed solution leverages AZLE,  a TypeScript/JavaScript runtime for building applications (canisters) on the IC. With AZLE it will possible to build & deploy REST API's to deliver decentralized AI workloads that inherit the benefits of the IC.

To use a pretrained model you need to download the model to some storage & then load it, or load it directly from the web without storing it. 

In python, this is as easy as doing:

```python
from sentence_transformers import SentenceTransformer
# Specify the model name or path
model_name = 'paraphrase-MiniLM-L6-v2'
# Download the pre-trained model
model = SentenceTransformer(model_name)
# Example usage
sentences = ["This is an example sentence.", "Download a Sentence Transformer model."]
embeddings = model.encode(sentences)
```

In this hack we validate if we could write "on chain" a pretrained model and then rebuilt it on the running canister with the purpose of generating predictions. If this is possible we would be unlocking a potential milestone towards the decentralization of AI workloads!

Some initial limitations were related to the size of model we could upload, initially tried with 900Mb, after knowing the limitation was closer to 90Mb I was able to find this model <90kB. Note: 90mB models are extreamly capable not an issue, and if capacity keeps increasing it's promising.

Model: https://www.kaggle.com/models/tensorflow/spam-detection/frameworks/tfJs

Technical conclusions: IT WORKED!

## How to Run:
Follow the steps at: https://github.com/demergent-labs/azle/blob/main/examples/hello_world/README.md
Checkout: https://github.com/demergent-labs/azle/tree/main

Built with <3 at ETH 5 de mayo
Big thanks to the ICP team & all mentors that helped me out.
```