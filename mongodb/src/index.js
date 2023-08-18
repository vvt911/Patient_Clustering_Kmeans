const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const patientRouter = require('./route/patientRoute');
const centroidRouter = require('./route/centroidRoute');

const app = express();
const port = 3000;

mongoose.connect('mongodb://127.0.0.1:27017/patient', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

app.use(express.json());
app.use('/api', patientRouter);
app.use('/api', centroidRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
})
