const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define Product Schema and Model
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String
});

const Product = mongoose.model('Product', productSchema);

// API Endpoints
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post('/api/products', async (req, res) => {
  const { name, price, description } = req.body;
  const newProduct = new Product({ name, price, description });

  try {
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Serve static files for the frontend
app.use(express.static('public'));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
