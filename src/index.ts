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
            const modelJSON = {"format": "layers-model", "generatedBy": "keras v2.4.0", "convertedBy": "TensorFlow.js Converter v1.7.0", "modelTopology": {"keras_version": "2.4.0", "backend": "tensorflow", "model_config": {"class_name": "Sequential", "config": {"name": "sequential", "layers": [{"class_name": "InputLayer", "config": {"batch_input_shape": [null, 20], "dtype": "int32", "sparse": false, "ragged": false, "name": "input_1"}}, {"class_name": "Embedding", "config": {"name": "embedding", "trainable": true, "batch_input_shape": [null, 20], "dtype": "float32", "input_dim": 2003, "output_dim": 7, "embeddings_initializer": {"class_name": "RandomUniform", "config": {"minval": -0.05, "maxval": 0.05, "seed": null}}, "embeddings_regularizer": null, "activity_regularizer": null, "embeddings_constraint": null, "mask_zero": false, "input_length": 20}}, {"class_name": "GlobalAveragePooling1D", "config": {"name": "global_average_pooling1d", "trainable": true, "dtype": "float32", "data_format": "channels_last"}}, {"class_name": "Dense", "config": {"name": "dense", "trainable": true, "dtype": "float32", "units": 7, "activation": "relu", "use_bias": true, "kernel_initializer": {"class_name": "GlorotUniform", "config": {"seed": null}}, "bias_initializer": {"class_name": "Zeros", "config": {}}, "kernel_regularizer": null, "bias_regularizer": null, "activity_regularizer": null, "kernel_constraint": null, "bias_constraint": null}}, {"class_name": "Dropout", "config": {"name": "dropout", "trainable": true, "dtype": "float32", "rate": 0.2, "noise_shape": null, "seed": null}}, {"class_name": "Dense", "config": {"name": "dense_1", "trainable": true, "dtype": "float32", "units": 2, "activation": "softmax", "use_bias": true, "kernel_initializer": {"class_name": "GlorotUniform", "config": {"seed": null}}, "bias_initializer": {"class_name": "Zeros", "config": {}}, "kernel_regularizer": null, "bias_regularizer": null, "activity_regularizer": null, "kernel_constraint": null, "bias_constraint": null}}]}}}, "weightsManifest": [{"paths": ["group1-shard1of1.bin"], "weights": [{"name": "dense/kernel", "shape": [7, 7], "dtype": "float32"}, {"name": "dense/bias", "shape": [7], "dtype": "float32"}, {"name": "dense_1/kernel", "shape": [7, 2], "dtype": "float32"}, {"name": "dense_1/bias", "shape": [2], "dtype": "float32"}, {"name": "embedding/embeddings", "shape": [2003, 7], "dtype": "float32"}]}]}

            // Load the model using the model JSON
            const model = await tf.loadLayersModel(tf.io.fromMemory(modelJSON));

            // Perform prediction using a sample input (replace it with your actual input)
            const batchSize = 1; // You can change the batch size as needed
            const sampleInput = tf.ones([batchSize, 20]); // Replace with your actual input shape
            const predictions = model.predict(sampleInput);

            // Convert predictions to a JavaScript array
            const resultArray = Array.isArray(predictions) ? predictions.map(t => Array.from(t.dataSync())) : Array.from(predictions.dataSync());

            // Update the global variable or do something with the predictions
            message = `Model loaded successfully. Predictions: ${resultArray}`;

        } catch (error) {
            // Handle any errors that may occur during the loading process
            console.error('Error loading the TensorFlow model:', error);
            message = 'Error loading the TensorFlow model';
        }
    })
});
