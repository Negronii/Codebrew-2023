const userRoute = require('express').Router();
const userController = require('../controllers/userController');

userRoute.post('/myInfo', userController.getMyInfo);
userRoute.post('/byId', userController.getUserInfo);
userRoute.post('/updateMyInfo', userController.updateMyInfo);
userRoute.post('/getUserByFieldandDistance', userController.getUserByFieldandDistance);

//export
module.exports = userRoute;
