import { Canister, query, text, update, Void } from 'azle';
import * as tf from '@tensorflow/tfjs';
import * as fs from 'fs/promises';

// This is a global variable used to store the embeddings
let message = '';

export default Canister({
    // Query calls complete quickly because they do not go through consensus
    getMessage: query([], text, () => {
        return message;
    }),

    embed: update([text], Void, async (newMessage) => {

        // Load the TensorFlow.js model 
        const modelPath = 'file:///Users/satoshi/Torah/decentAI/src/archive/model.json';

        try {
            // Read the model JSON file
            const modelJSON = await fs.readFile(modelPath, 'utf8');
            
            // Load the model using the model JSON
            const model = await tf.loadLayersModel(tf.io.fromMemory(modelJSON));

            // Now you can use the loaded model as needed
            // For example, you can use model.predict() or other methods

            // Update the global variable if needed
            message = 'Model loaded successfully';
        } catch (error) {
            // Handle any errors that may occur during the loading process
            console.error('Error loading the TensorFlow model:', error);
            message = 'Error loading the TensorFlow model';
        }
    })
});
