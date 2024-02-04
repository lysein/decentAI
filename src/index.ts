import { Canister, query, text, update, Void } from 'azle';
import * as tf from '@tensorflow/tfjs-node';
import * as fs from 'fs';

let message = '';

export default Canister({
    getMessage: query([], text, () => {
        return message;
    }),

    embed: update([text], Void, async (newMessage) => {
        const modelPath = 'file:///Users/satoshi/Torah/1_Github/kool/hello_world_smallmodel/src/assets/archive/model.json';

        try {
            // Read the model JSON file synchronously
            const modelData = fs.readFileSync(modelPath, 'utf8');

            // Parse the JSON model data
            const modelSpec = JSON.parse(modelData);

            // Load the TensorFlow.js model using the parsed model spec
            const model = await tf.loadLayersModel(tf.io.fromMemory(modelSpec));

            // Prepare input data
            const sentences = newMessage.split(',');
            const textEncoder = new TextEncoder();
            const inputTensor = tf.tensor(sentences.map(sentence => textEncoder.encode(sentence)));

            // Make predictions using the loaded model
            const embeddings = model.predict(inputTensor);

            // Convert the embeddings to a string or any other desired format
            message = embeddings.toString();
            
        } catch (error) {
            console.error('Error loading or predicting with the TensorFlow model:', error);
            message = 'Error occurred';
        }
    })
});
