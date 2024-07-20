const express = require('express');
const connectDB = require('./db'); 
require('dotenv').config();

const app = express();

connectDB();

app.use(express.json());

app.use('/api', require('./routes/userRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
