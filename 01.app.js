const express = require('express');
const path = require('path');
const moment = require('moment');
const { mysql, connection } = require('./modules/mysql-conn');

const cityRouter = require('./routes/city-route')

const app = express();
app.listen(3000, () => {console.log('//127.0.0.1:3000')});

app.set('view engine', 'pug');
app.set('veiws', path.join(__dirname, 'views'));
app.locals.pretty = true;

// post방식 받을 때 !!
app.use(express.json()); //json으로 만듦
app.use(express.urlencoded({ extended: false })); //json이 parsing
// post의 요청사항은 req.body에

app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/city', cityRouter);
// middlewear : front와 backEnd 사이에 있음
// '/' -> middlewear

app.use((req, res) => {
  res.send('/404');
})