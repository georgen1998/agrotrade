const app = require('./src/app');

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('API running in port:', port);
})

app.get('/', (req, res) => {
    res.send('AgroTrade Api is running!')
})