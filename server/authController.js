const User = require('./models/User')
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const {secret} = require('./config')

const geterateAccesToken = (id) =>{

    const payload = {
        id
    }

    return jwt.sign(payload, secret, {expiresIn:"10d"})

}





class authController {
  async registration(req, res) {
    try{
        const errors = validationResult(req)
        if (!errors.isEmpty()){
            return res.status(400).json({message:"Ошбика при регистрации",errors})
        }
        const {username,email,password} = req.body
        const candidate = await User.findOne({email})
        if (candidate){
            return res.status(400).json({message:"Пользователь уже зарегестрирован"})
        }
        const hashPassword = bcrypt.hashSync(password, 7)
        const user = new User({username, email, password: hashPassword})
        await user.save()
        return res.json({message:'Пользователь успешно зарегестрирован'})


    }catch (e) { 
        console.log(e)
        res.status(400).json({message:'registration error'})
    }
  }
  async login(req, res) {
    try{
        const {email, password} = req.body
        console.log(email)
        const user = await User.findOne({email})
        if (!user){
            return res.status(400).json({message: `Пользователь ${email} не найден`})
        }
        const validPassword = bcrypt.compareSync(password, user.password)
        if (!validPassword){
            return res.status(400).json({message:'Введен неверный пароль'})
        }
        const token = geterateAccesToken(user._id)
        return res.json({token})

       
    }catch (e) {
        console.log(e)
        res.status(400).json({message:'registration error'})
    }
  }
  async getUsers(req, res) {
    try{
        const users = await User.find()
        res.json(users)
        
        res.json('server work')
    }catch (e) {

    }
  }
}

module.exports = new authController()