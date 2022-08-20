const express = require('express');
const User = require('../models/User');
const auth = require("../middleware/auth.middleware");
const router = express.Router({mergeParams: true});
const Favorite = require('../models/Favorite');

router.post("/", auth, async (req, res) => {
    try {
        const { cityId } = req.body;
        const newFavorite = await Favorite.create({
            cityId,
            userId: req.userId
        })
        res.status(201).send(newFavorite);
    } catch (error) {
        res.status(500).json({
            message: 'На сервере произошла ошибка. Попробуйте позже.'
        })
    }
});

router.get("/", auth, async (req, res) => {
    try {
        const { orderBy, equalTo } = req.query;
        const { cityId } = req.body;
        const favoriteList = await Favorite.find({
            [orderBy]: equalTo
        })
        res.send(favoriteList);
    } catch (error) {
        res.status(500).json({
            message: 'На сервере произошла ошибка. Попробуйте позже.'
        })
    }
});
module.exports = router