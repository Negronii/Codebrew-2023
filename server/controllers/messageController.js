const User = require('../models/user');
const Message = require('../models/message');
const Session = require('../models/session');

// get the user's sessions
async function getUserSessionsInfo(req, res) {
  const userInfo = await req.user
    .populate({
      path: 'sessions',
      model: 'Session',
      populate: [
        { path: 'user1', model: 'User' },
        { path: 'user2', model: 'User' },
        {
          path: 'messages',
          model: 'Message',
          options: { sort: { time: -1 }, limit: 1 },
          populate: { path: 'sender', model: 'User' },
        },
      ],
    });

  const sessionsInfo = userInfo.sessions.map((session) => {
    const oppositeUser =
      session.user1._id.toString() === req.user._id.toString()
        ? session.user2
        : session.user1;
    const lastMessage = session.messages[0];

    return {
      firstName: oppositeUser.first_name,
      lastName: oppositeUser.last_name,
      avatar: oppositeUser.avatar,
      sessionId: session._id,
      lastMessageContent: lastMessage ? lastMessage.message : null,
    };
  });

  return res.status(200).json({
    message: 'success',
    sessions: sessionsInfo,
    });
}


// get the session's messages
async function getSession(req, res) {
    const session = await Session.findById(req.body.sessionId)
        .populate({
            path: 'messages',
            model: 'Message',
            options: { sort: { time: 1 } },
            populate: { path: 'sender', model: 'User' },
        })
        .exec();

    const messagesArray = session.messages.map(message => {
        return {
            messageContent: message.message,
            isMyMessage: message.sender._id.toString() === req.user._id.toString(),
        };
    });

    res.status(200).json({
        message: 'success',
        messages: messagesArray,
    });
}


// send message to a session
async function sendMessage(req, res) {
    const { sessionId, content } = req.body;

    // Create a new message
    const newMessage = new Message({
        sender: req.user._id,
        message: content,
        time: new Date()
    });

    // Save the message
    await newMessage.save();

    // Add the message to the session
    await Session.findByIdAndUpdate(sessionId, {
        $push: { messages: newMessage._id }
    });

    return res.status(200).json({message: "success"});
}

// start a new conversation
async function startConversation(req, res) {
    const { targetUserId, content } = req.body;

    // Create a new session
    const newSession = new Session({
        user1: req.user._id,
        user2: targetUserId,
        messages: []
    });

    // Save the session
    await newSession.save();

    // Create a new message
    const newMessage = new Message({
        sender: req.user._id,
        message: content,
        time: new Date()
    });

    // Save the message
    await newMessage.save();

    // Add the message to the new session
    await Session.findByIdAndUpdate(newSession._id, {
        $push: { messages: newMessage._id }
    });

    // Add the session to both users
    await User.findByIdAndUpdate(req.user._id, {
        $push: { sessions: newSession._id }
    });
    await User.findByIdAndUpdate(targetUserId, {
        $push: { sessions: newSession._id }
    });


    res.status(200).send({ session: newSession, message: newMessage });
}

// export
module.exports = {
    getUserSessionsInfo,
    getSession,
    sendMessage,
    startConversation,
};
