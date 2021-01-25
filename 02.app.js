/************ 전역선언 ************/
const express = require('express');
const app = express();
const path = require('path');
const { err } = require('./modules/util')

/************ 라우터 불러오기 ************/
const bookRouter = require('./routes/book-route')

/************ 서버실행 ************/
app.listen(3000, () => {console.log('http://127.0.0.1:3000')});

/************ PUG설정 ************/
app.set('view engine', 'pug');
app.set('veiws', path.join(__dirname, 'views'));
app.locals.pretty = true;

/************ POST처리 req.body  ************/
// post방식 받을 때 !!
app.use(express.json()); //json으로 만듦
app.use(express.urlencoded({ extended: false })); //json이 parsing
// post의 요청사항은 req.body에

/************여기까지는 모든 노드에서 토씨 하나 안틀리고 그래도 씀(라우터 불러오기 빼고)************/


/************ 라우터 구현 ************/
app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/book', bookRouter);
// middlewear : front와 backEnd 사이에 있음
// '/' -> middlewear

/************ 에러처리 ************/
app.use((req, res, next) => { //not found
  next(err(404))
})

app.use((err, req, res, next) => { //error
  res.render('error', err);
})