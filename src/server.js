const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Data = require('./models/Data'); 
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(`mongodb+srv://<db_user>:<db_password>@<db_name>.zmvby.mongodb.net/myDB?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.log(error.message));

// Routes
app.get('/api/data', async (req, res) => {
  try {
    const data = await Data.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/data', async (req, res) => {
  const newData = new Data({
    name: req.body.name,
    email: req.body.email,
  });

  try {
    const result = await newData.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
