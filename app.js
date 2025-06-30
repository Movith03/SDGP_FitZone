const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const userRouter = require('./Routers/userRouter');
const userDataRouter = require('./Routers/userDataRouter');
const exerciseRoute = require('./Routers/exerciseRoute');
const scheduleRoute = require('./Routers/scheduleRoute');
const workoutDetails = require('./Routers/workoutdetailRoute');
const userSchedule = require('./Routers/userScheduleRoute');
const tracking = require('./Routers/trackingRoute');
const dietplan = require('./Routers/dietplanRoute');

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header(
    'Access-Control-Allow-Methods',
    'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

// app.options('*', cors(corsOptions)); // Preflight request handling

app.use((req, res, next) => {
  req.requestT = new Date().toISOString();
  console.log(req.headers);
  console.log(req.body);
  next();
});

// app.get('/api/v1/test', (req, res) => {
//   res.status(200).json({
//     status: 'success',
//     message: 'API is WORKING!',
//   });
// });
const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

// Use CORS middleware
app.use(cors(corsOptions));

app.use('/api/v1/user', userRouter);
app.use('/api/v1/userdata', userDataRouter);
app.use('/api/v1/exerc', exerciseRoute);
app.use('/api/v1/schedule', scheduleRoute);
app.use('/api/v1/workoutdetails', workoutDetails);
app.use('/api/v1/workout', userSchedule);
app.use('/api/v1/tracking', tracking);
app.use('/api/v1/dietplan', dietplan);

module.exports = app;
