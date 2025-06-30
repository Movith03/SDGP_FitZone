const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app');
const express = require('express');
dotenv.config({ path: './config.env' });

console.log(process.env.NODE_ENV);

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
  })
  .then((conn) => {
    console.log('Connection Successfully!');
  })
  .catch((err) => {
    console.log('Error!', err);
  });

app.use(express.json());

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
