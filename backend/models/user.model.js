//import/require mongoose lib.
const mongoose = require('mongoose');

//Create new User mongoose schema. Has 1 field, username. Validations can be found in inner nest. Timestamps for when users are created.
const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true, trim: true, minlength: 3
        },
    }, {
    timestamps: true,
});

//Create user model, based on userSchema above.
const User = mongoose.model('User', userSchema);

//Export User Model.
module.exports = User;