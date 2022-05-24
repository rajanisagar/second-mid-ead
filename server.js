const express = require("express")
const mongoose = require('mongoose')
const User = require('./models/user')
const app = express()
const userRouter = require('./routes/users')
const methodOverride = require('method-override')

mongoose.connect('mongodb://localhost/userDB',{ useNewUrlParser: true, useUnifiedTopology: true})

app.set('view engine', 'ejs')

app.use(express.urlencoded({extended: false}))  
app.use(methodOverride('_method'))

app.get('/',async (req,res) => {
    const users = await User.find()

   res.render('users/index', { users:users })
})
app.use('/users',userRouter)

app.listen(5000)