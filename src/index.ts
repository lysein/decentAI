import { Canister, query, text, update, Void } from 'azle';
import * as tf from '@tensorflow/tfjs';

// This is a global variable used to stored the embeddings
let message = '';

export default Canister({
    // Query calls complete quickly because they do not go through consensus
    getMessage: query([], text, () => {
        return message;
    }),

    embed: update([text], Void, async (newMessage) => {

        // Load the TensorFlow.js model from the SavedModel
        const model = await tf.loadLayersModel('file:///Users/satoshi/Torah/1_Github/kool/hello_world_smallmodel/src/assets/archive/model.json'); // Note the three slashes after file: in the URL. This is the correct format for file URLs.

        // Prepare input data
        const sentences = newMessage.split(','); // Assuming newMessage is a comma-separated string
        const textEncoder = new TextEncoder();
        const inputTensor = tf.tensor(sentences.map(sentence => textEncoder.encode(sentence)));

        // Make predictions using the loaded model
        const embeddings = model.predict(inputTensor);

        // Convert the embeddings to a string or any other desired format
        message = embeddings.toString();

    })
});

