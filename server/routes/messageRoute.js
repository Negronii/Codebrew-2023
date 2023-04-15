const messageRoute = require('express').Router();
const messageController = require('../controllers/messageController');

messageRoute.post('/mySessions', messageController.getUserSessionsInfo);
messageRoute.post('/byId', messageController.getSession);
messageRoute.post('/send', messageController.sendMessage);
messageRoute.post('/request', messageController.startConversation);

//export
module.exports = messageRoute;
