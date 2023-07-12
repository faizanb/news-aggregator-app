const express = require('express');
const bodyParser = require('body-parser');

const {routes: newsRoutes} = require('./routes/newsRoutes');
const {routes: prefRoutes} = require('./routes/prefRoutes');
const {routes: indexRoutes} = require('./routes');

require('dotenv').config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/news', newsRoutes);
app.use('/preferences', prefRoutes);
app.use('/', indexRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})