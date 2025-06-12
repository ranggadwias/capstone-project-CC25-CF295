import * as tf from "@tensorflow/tfjs";

const labels = ["Pengeluaran Kecil", "Pengeluaran Sedang", "Pengeluaran Besar"];

let model = null;

export const loadModel = async () => {
  if (!model) {
    model = await tf.loadLayersModel("/tfjs-model/model.json");
    console.log("✅ Model loaded");
  }
};

export const predictCluster = async (amount) => {
  if (!model) await loadModel();

  const fakeMean = 500000; 
  const fakeStd = 300000;

  const standardized = (amount - fakeMean) / fakeStd;

  const input = tf.tensor2d([[standardized]]);
  const prediction = model.predict(input);
  const output = await prediction.data();

  const maxIndex = output.indexOf(Math.max(...output));
  return labels[maxIndex];
};