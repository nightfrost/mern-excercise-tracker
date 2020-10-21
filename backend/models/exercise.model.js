//import/require mongoose lib.
const mongoose = require('mongoose');

//Create new exercise mongoose schema. Has 4 fields: requires username, description, duration and date. Has Timestamps for each exercise.
const exerciseSchema = new mongoose.Schema( {
    username: { type: String, required: true},
    description: { type: String, required: true},
    duration: { type: Number, required: true},
    date: { type: Date, required: true},
}, {
    timestamps: true,
});

//Create the exercise model, using the exerciseSchema above.
const Exercise = mongoose.model('Exercise', exerciseSchema);

//export exercise model.
module.exports = Exercise;