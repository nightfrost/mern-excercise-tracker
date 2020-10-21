//Import/require Router module from Express framework. Import/require User model.
const router = require('express').Router();
let User = require('../models/user.model');

/*
#1 route is default. Finds users based on User model, then returns the users in json. Catches error if occurs, and outputs in json.

#2 route is /add route. First we assign username to the variable in the request body. We then create a user object, and assign the username,
which is required by the model. We then save the user, and respond in json. Catches error if any.
*/

//#1 Route
router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

//#2 Route
router.route('/add').post((req, res) => {
    const username = req.body.username;

    const newUser = new User({username});

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//Export the router.
module.exports = router;