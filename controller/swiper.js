const express = require('express')
const router = express.Router()
const swiperModel = require('../model/swiper')
const auth = require('./auth')

router.post('/', auth, async (req, res, next) => {
    try{
        let {
            title,
            img,
            newsId,
            status,
            sort
        } = req.body

        const data = await swiperModel.create({
            title,
            img,
            newsId,
            status,
            sort
        })

        res.json({
            code: 200,
            msg: '添加轮播图成功'
        })
    } catch(err){
        next(err)
    }
})

router.get('/', async (req, res, next) => {
    try{
        let {page=1, page_size=10} = req.query
        page = parseInt(page)
        page_size = parseInt(page_size)

        const dataList = await swiperModel
            .find()
            .skip((page-1)*page_size)
            .limit(page_size)
            .populate({path: 'newsId'})
            .sort({sort: -1, _id: -1})

        res.json({
            code: 200,
            msg: 'success',
            data: dataList
        })
    }catch(err) {
        next(err)
    }
})

router.get('/:id', async (req, res, next) => {
    try{
        const {id} = req.params
        const data = await swiperModel
            .findById(id)
        res.json({
            code: 200,
            msg: 'success',
            data,
        })
    } catch(err){
        next(err)
    }
})

router.patch('/:id', auth, async (req, res, next) => {
    try{
        const {id} = req.params
        const {
            img,
            title,
            neewsId,
            sort,
            status
        } = req.body

        const data = await swiperModel.findById(id)
        const updateData = await data.update({$set: {
            img,
            title,
            neewsId,
            sort,
            status
        }})
        
        res.json({
            code: 200,
            msg: '修改轮播图成功',
            data: updateData
        })
    }catch(err){
        next(err)
    }
})

module.exports = router