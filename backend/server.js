const express = require('express');
const createError = require('http-errors');
const morgan = require('morgan');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const cors = require('cors');

const userRoutes =  require('./routes/userRoutes');


// const userRoutes = require('./routes/authRoutes');

//db connection
const connectDB = require("./config/db");
connectDB();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials: true}));
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

// Middleware
// app.use(bodyParser.json());
// app.use('/api/users', userRoutes);

app.get('/', async (req, res, next) => {
  res.send({ message: 'Awesome it works 🐻' });
});

app.use('/api/users', userRoutes);

app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
