const User = require('../models/user')
const geolib = require('geolib');

// get the user info
function getMyInfo(req, res) {
    const user = req.user
    res.status(200).json({
        message: "success", 
        user: {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            gender: user.gender,
            language: user.language,
            dob: user.dob,
            type: user.type,
            status: user.status,
            field: user.field,
        }
    })
}

// get the user info
async function getUserInfo(req, res) {
    const user = await User.findById(req.body.userId) 
    if (!user) {
        return res.status(404).json({
            message: "user not found"
        })
    }
    res.status(200).json({
        message: "success", 
        user: {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            gender: user.gender,
            language: user.language,
            dob: user.dob,
            type: user.type,
            status: user.status,
            field: user.field,
        }
    })
}

// update the user info
async function updateMyInfo(req, res) {
    const user = req.user
    const updatedUser = req.body
    if (updatedUser.password) {
        updatedUser.password = await bcrypt.hash(updatedUser.password, 10)
    }
    delete updatedUser.email
    delete updatedUser.sessions
    for (const key in updatedUser) {
        user[key] = updatedUser[key]
    }
    await user.save()
    res.status(200).json({
        message: "success"
    })
}

// sort the users by the number of overlapping fields and distance
async function getUserByFieldandDistance(req, res) {
    const user = req.user;
    const userType = user.type === 'client' ? 'volunteer' : 'client';
    const users = await User.find({ type: userType });
    const defaultMaxDistance = Number.MAX_VALUE; // Set a default maximum distance

    const usersWithDistanceAndOverlap = users.map((u) => {
        const overlappingFields = u.field.filter((field) => user.field.includes(field));
        const distance = (user.latitude !== null && user.longitude !== null && u.latitude !== null && u.longitude !== null)
            ? geolib.getDistance(
                { latitude: user.latitude, longitude: user.longitude },
                { latitude: u.latitude, longitude: u.longitude }
              )
            : defaultMaxDistance;

        return {
            user: u,
            overlappingFieldsCount: overlappingFields.length,
            distance: distance,
        };
    });

    const sortedUsers = usersWithDistanceAndOverlap
            .sort((a, b) => {
                if (a.overlappingFieldsCount !== b.overlappingFieldsCount) {
                    return b.overlappingFieldsCount - a.overlappingFieldsCount;
                }
                return a.distance - b.distance;
            })
            .slice(0, 10)
            .map((u) => ({
                _id: u.user._id,
                first_name: u.user.first_name,
                last_name: u.user.last_name,
                avatar: u.user.avatar,
                overlapped_fields_number: u.overlappingFieldsCount,
                distance: u.distance === defaultMaxDistance ? "Not available" : u.distance
            }));

    res.json(sortedUsers);
}


//export 
module.exports = {
    getMyInfo,
    getUserInfo,
    updateMyInfo,
    getUserByFieldandDistance
}
