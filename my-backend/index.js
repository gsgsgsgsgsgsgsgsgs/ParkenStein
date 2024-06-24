const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

// Remplacez par votre propre URL MongoDB
const mongoDB = 'mongodb+srv://gsebbah:guedalia050504@cluster0.jharwc8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Inclure les routes utilisateurs
const userRoutes = require('./routes/users');
app.use('/api', userRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
