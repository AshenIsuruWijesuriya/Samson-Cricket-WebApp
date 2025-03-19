const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const userRoutes =  require('./routes/userRoutes');
const batRoutes = require('./routes/batsRoutes')

//db connection
const connectDB = require("./config/db");
connectDB();

const app = express();
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", process.env.CLIENT_URL)
    res.setHeader("Access-Control-Allow-Methods", 'GET, POST, DELETE')
    res.setHeader("Access-Control-Allow-Headers", 'Content-Type', "Authorization")
    res.header("Access-Control-Allow-Credentials", true)
    next();
});
app.use(cors());
app.use('/uploads', express.static('uploads'));

app.use('/api/users', userRoutes);
app.use('/api/bats', batRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
