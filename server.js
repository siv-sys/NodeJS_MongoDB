import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

const app = express();
dotenv.config();


app.use(express.json());


const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGO_URI;



mongoose.connect(MONGODB_URI)
.then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const findUser = new mongoose.Schema({
    name: String,
    age: Number,
    gender: String
})

const userModel = mongoose.model("user", findUser)

app.get("/getUser", async (req, res) => {
  try {
    const userData = await userModel.find();

    res.json(userData);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
});