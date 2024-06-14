const express = require('express');
const cors = require('cors');
const app = express();

const index = require('./routes/index');

const personRoute = require('./routes/person.routes');
const productRoute = require('./routes/product.routes');
const reviewRoute = require('./routes/review.routes');
const eventRoute = require('./routes/event.routes');
const postRoute = require('./routes/post.routes');
const farmerProductsRoute = require('./routes/farmerProduct.routes');
const farmerEventsRoute = require('./routes/farmerEvent.routes');
const favoriteRoute = require('./routes/favorite.routes');

const uploadRoute = require('./routes/upload.routes');
const authRoutes = require('./routes/auth');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: 'application/vnd.api+json'}));
app.use(cors());

app.use(index);
app.use('/api/', personRoute);
app.use('/api/', productRoute);
app.use('/api/', reviewRoute);
app.use('/api/', eventRoute);
app.use('/api/', postRoute);
app.use('/api/', farmerProductsRoute);
app.use('/api/', farmerEventsRoute);
app.use('/api/', favoriteRoute);

app.use('/api/', authRoutes);
app.use('/api/', uploadRoute);
app.use('/uploads', express.static('uploads'));

module.exports = app;
