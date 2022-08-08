console.log("Hola Server - HealtConnect");
const authRoutes = require('./routes/auth.js');
require("dotenv").config();

const express = require('express')
const app = express();
app.use('/api/user', authRoutes);
app.get('/', (req, res) => {
    res.json({ mensaje: 'My Auth Api Rest' })
})

const Server = require("./models/server");

const server = new Server();

const dashboardRoutes = require('./routes/dashboard');
const verifyToken = require('./routes/validate-token');

server.listen();

app.use('/api/dashboard', verifyToken, dashboardRoutes);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));