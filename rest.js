const express = require('express');
const { sequelize } = require('./models');
const cors = require('cors');
const admin = require('./routes/admin');
const app = express();

var corsOptions = {
    origin: 'http://127.0.0.1:8000',
    optionsSuccessStatus: 200
}

app.use(express.json());
app.use(cors(corsOptions));

app.use("/admin", admin)

sequelize.authenticate()
    .then(() => console.log('Konektovani ste na bazu.'))
    .catch(err => console.log('Greska: ' + err));

app.listen({port: 9000}, async() => {
    await sequelize.authenticate();
});