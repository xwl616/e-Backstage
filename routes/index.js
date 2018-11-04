var express = require('express');
var router = express.Router();
const adminUserModel = require('../model/adminUser')
const jwt = require('jsonwebtoken')
const cert = require('../utils/auth')
const newsModel = require('../model/news')

/* GET home page. */
router.use('/admin/adminUser', require('../controller/adminUser'))
router.use('/admin/news', require('../controller/news'))
router.use('/admin/category', require('../controller/category'))
router.use('/admin/swiper', require('../controller/swiper'))
router.use('/admin/topic', require('../controller/topic'))
router.use('/admin/common', require('../controller/common'))



router.post('/demo/login', async (req, res, next) => {
    const {
        username,
        password
    } = req.body

    const user = await adminUserModel.findOne({username})
    if(user) {
        if(user.password == password){
            const token = jwt.sign({userId: user._id }, cert, {expiresIn: 60*60*7})
            res.json({
                code: 200,
                token,
                msg: '登录成功',
                data: user
            })
        }else {
            res.json({
                code: 400,
                msg: '密码不正确'
            })
        }
    }else{
        res.json({
            code: 400,
            msg: '该用户不存在'
        })
    }
})
router.get('/demo/getNews1', async (req, res, next) => {
    const dataList = await newsModel.find()
    res.json({
        code: 200,
        msg: 'success',
        data: dataList
    })
})
router.get('/demo/getNews2', (req, res, next) => {
    let token = req.header.token || req.body.token || req.query.token

    if(token){
        jwt.verify(token, cert, function(err, decode){
            if(err){
                res.json({
                    code: 403,
                    msg: '登录状态失效'
                })
                return 
            }
            console.log(decode)
            adminUserModel.findOne({_id: decode.userId}).then(user => {
                newsModel.find().then(data => {
                    res.json({
                        code: 200,
                        data: {
                            news: data,
                            user: user
                        }
                    })
                })
            })
        })  
    }else {
        res.json({
            code: 403,
            msg:'缺少token'
        })
    }
  
})

module.exports = router;
