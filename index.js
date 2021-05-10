const express = require('express')
const app = express()
const port = 5000
const bodyParser = require("body-parser");
const config = require('./config/key');

const { User } = require("./models/Users");

//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}))

//application/json
app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected'))
  .catch(() => console.log(err))



app.get('/', (req, res) => {
  res.send('Hello World!~안녕하세요-2021년 5월입니다.')
})

app.post('/register', (req, res) => {
  //회원 가입 할 때 필요한 정보들을 client에서 가져오면
  //그것들을 데이터 베이스에 넣어준다.
  
  const user = new User(req.body) //bodyparser를 통해서 클라이언트에 들어온 사용자 정보를 서버에서 해석할 수 있도록 해준다.

  user.save((err, userInfo) => {
    if(err) return res.json({success:false, err})
    return res.status(200).json({
      success:true
    })
  }) //사용자 정보가 user모델에 저장된다.
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})