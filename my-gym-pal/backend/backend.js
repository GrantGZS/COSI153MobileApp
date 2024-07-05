const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/user');
const exerciseRoutes = require('./routes/exercise');
const trainingPlanRoutes=require('./routes/trainingPlan');
const app = express();
const PORT = process.env.PORT || 8080;

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:8081', 
  optionsSuccessStatus: 200,
};

//Middleware

app.use((req, res, next) => {
  console.log('Request received');
  console.log('Origin:', req.headers.origin);
  console.log('Method:', req.method);
  next();
});
app.use(bodyParser.json());
app.use(cors(corsOptions)); 

// Routes
// app.use('/',(req, res, next) => {
//   console.log('Hello backend');
//   res.json('hello world')});
app.use('/api/user', userRoutes);
app.use('/api/exercise', exerciseRoutes);
app.use('/api/training-plan', trainingPlanRoutes);
//MongoDB connection
mongoose.connect('mongodb://localhost:27017/mygympal', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
