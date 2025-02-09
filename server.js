const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');
const requestsRoute = require('./routes/requests');
const offersRoute = require('./routes/offers');
const reviewsRoute = require('./routes/reviews');
const usersRoute = require('./routes/users');
const paymentRoute = require('./routes/payment');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/api/requests', requestsRoute);
app.use('/api/offers', requestsRoute);
app.use('/api/reviews', reviewsRoute);
app.use('/api/users', usersRoute);
app.use('/api/payment', paymentRoute);

app.get('/', (req, res) => {
  res.send('Server is running');
});

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log(err));

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('sendMessage', (message) => {
    io.emit('receiveMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
