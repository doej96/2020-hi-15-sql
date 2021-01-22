const express = require('express');
const app = express();
app.listen(3000, () => {console.log('//127.0.0.1:3000')});


// app.use : 다 받음, app.get : 특정한 req를 받음
// request 들어오면 app.use 지나가야함
app.use(() => {
  console.log('middlewear1'); // res없어서 계속 로딩함
  req.user = 'eunjeong';
  next(); //다음으로 넘겨줌
});
// => 왜 필요한가? req, res 변경할 수 있기 때문에, req는 전역변수

app.get('/', (req, res, next) => {
  console.log(req.user);
  res.send('<h1>ROOT</h1>');
});