//Require/import Express router and Exercise model.
const router = require('express').Router();
let Exercise = require('../models/exercise.model');

/*
#1 Default route. Finds all exercises in DB based on Exercise model, returns the exercises in JSON. If error respond with error in JSON.

#2 Add route. Creates a new exercise with the parsed values from the request (body), and then saves the new exercise in the DB. Returns with JSON succes or fail.

#3 Get route with ID. Will return the desired exercise.

#4 Delete route with ID. Will find exercise by ID, then delete the given exercise. Returns json exercise deleted

#5 Update route with ID. Will find 
*/

//#1
router.route('/').get((req, res) => {
    Exercise.find()
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json('Error ' + err));
});

//#2
router.route('/add').post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExercise = new Exercise({username,description,duration,date})

    newExercise.save()
        .then(() => res.json('Exercise added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//#3
router.route('/:id').get((req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json('Error: ' + err));
});

//#4
router.route('/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
        .then(() => res.json('Exercise deleted: ' + req.params.id))
        .catch(err => res.status(400).json('Error: ' + err))
})

//#5
router.route('/update/:id').post((req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => {
            exercise.username = req.body.username;
            exercise.description = req.body.description;
            exercise.duration = Number(req.body.duration);
            exercise.date = Date.parse(req.body.date);

            exercise.save()
                .then(() => res.json('Exercise updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
})

//Export router.
module.exports = router;