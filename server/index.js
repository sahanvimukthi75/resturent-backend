
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const RestaurantModel = require('./models/Resturent'); 

const app = express();
app.use(cors());
app.use(express.json());

const dbURI = process.env.MONGODB_URI;
const port = process.env.PORT || 3001;

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

app.post("/createResturent", (req, res) => {
  RestaurantModel.create(req.body)
    .then(restaurant => res.json(restaurant))
    .catch(err => {
      console.error("Error creating restaurant:", err);
      res.status(500).json({ error: " Server Error" });
    });
});

app.get("/restaurants", (req, res) => {
    RestaurantModel.find()
      .then(restaurants => res.json(restaurants))
      .catch(err => {
        console.error('Error fetching restaurants:', err);
        res.status(501).json({ error: ' Server Error' });
      });
  });

  app.get("/restaurants/:id", (req, res) => {
    const id = req.params.id;
    console.log(id);
    RestaurantModel.findById(id)
      .then(restaurant => res.json(restaurant))
      .catch(err => {
        console.error('Error fetching restaurant:', err);
        res.status(502).json({ error: ' Server Error' });
      });
  });
  
  
app.put("/updateRestaurant/:id", (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  RestaurantModel.findByIdAndUpdate(id, updateData, { new: true })
    .then(updatedRestaurant => res.json(updatedRestaurant))
    .catch(err => {
      console.error('Error updating restaurant:', err);
      res.status(503).json({ error: ' Server Error' });
    });
});


app.delete('/deleteRestaurant/:id', (req, res) => {
  const id = req.params.id;
  RestaurantModel.findByIdAndDelete(id)
    .then(result => res.json({ message: 'Restaurant deleted successfully', result }))
    .catch(err => res.json(err));
});




app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
