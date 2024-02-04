import { Canister, query, text, update, Void } from 'azle';
// import * as tf from '@tensorflow/tfjs';

// This is a global variable used to stored the embeddings
let message = '';

export default Canister({
    // Query calls complete quickly because they do not go through consensus
    getMessage: query([], text, () => {
        return message;
    }),

    embed: update([text], Void, (newMessage) => {
        // This is where the pretrained model needs to be implemented
        // Need to solve issues with tf trying to use fetch to load model.
        // A possible solution would be to use fs.promises.readFile function to read the contents of the file directly. It then parses the JSON and uses tf.io.fromMemory to create an IOHandler that loads the model from the parsed JSON object.
        // Make sure to adjust the filePath variable with the correct local file path. Note that this approach is suitable for a Node.js environment; if you are working in a browser environment, you might need to use a different method to read the file content, such as using the File API or FileReader.
        
        // It would look something like this:
        // // Load the TensorFlow.js model from the SavedModel
        // const model = await tf.loadLayersModel('/Users/satoshi/Torah/decentAI/src/archive'); // Note the three slashes after file: in the URL. This is the correct format for file URLs.

        // // Prepare input data
        // const sentences = newMessage.split(','); // Assuming newMessage is a comma-separated string
        // const textEncoder = new TextEncoder();
        // const inputTensor = tf.tensor(sentences.map(sentence => textEncoder.encode(sentence)));

        // // Make predictions using the loaded model
        // const embeddings = model.predict(inputTensor);

        // // Convert the embeddings to a string or any other desired format
        // message = embeddings.toString();

        message = "[0.1,-0.1,-0.2]"; // we transform documents in to vectorspaces so that we can create a multi dimentional vector space in which vectors close together have semantic similarity!
        // then we can query that vector DB to do Retrieval Augmented Generation workloads
        // Having decentralized endpoints to run AI services is a crucial step forward in the AI lifecycle
        // mainly because of the censorship ressitance
        // by implementing this project we will be replacing the call to OpenAIEmbeddings (cell number [15]) which is a centralized endpoint
        // and also replacing HuggingFaceInstructEmbeddings (cell number [59]) which is also centralized
        // but most importantly it requires the user to provision the hardware neccesary to run the model
        // see: https://github.com/carlosarturoceron/online_learning_assistant/blob/dev/src/Q1/second_course/second_course.ipynb
    })
});

