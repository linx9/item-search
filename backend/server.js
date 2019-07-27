const path = require('path');
const express = require('express');
const resultsRouter = require('./routes/result');
const photosRouter = require('./routes/photos');
const similarRouter = require('./routes/similar');
const geonameRouter = require('./routes/geoname');
const detailRouter = require('./routes/details');

let app = express();

const port = process.env.PORT || 8081;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  next();
});

app.use(express.static(path.join(__dirname,'frontend')));
app.all('/',(req, res, next) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

app.use('/result', resultsRouter);
app.use('/similar',similarRouter);
app.use('/geoname',geonameRouter);
app.use('/detail',detailRouter);
app.use('/photos',photosRouter);


app.listen(port, () => console.log(`Example app listening on port ${port}!`));





