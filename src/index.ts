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

        // message = "[0.1,-0.1,-0.2]"; // we transform documents in to vectorspaces so that we can create a multi dimentional vector space in which vectors close together have semantic similarity!
        // then we can query that vector DB to do Retrieval Augmented Generation workloads
        // Having decentralized endpoints to run AI services is a crucial step forward in the AI lifecycle
        // mainly because of the censorship ressitance
        // by implementing this project we will be replacing the call to OpenAIEmbeddings (cell number [15]) which is a centralized endpoint
        // and also replacing HuggingFaceInstructEmbeddings (cell number [59]) which is also centralized
        // but most importantly it requires the user to provision the hardware neccesary to run the model
        // see: https://github.com/carlosarturoceron/online_learning_assistant/blob/dev/src/Q1/second_course/second_course.ipynb
    })
});

