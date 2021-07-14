const express = require("express");
const mongoose = require("mongoose");
const Workout = require("./models/models.js");
const path = require('path');

const PORT = process.env.PORT || 3000;

//mongoose Connection
mongoose.connect("mongodb://localhost:27017/workout", {useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true, useCreateIndex: true});

//Instance of express server
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

//Static Routes
app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

app.get("/stats", (req, res) => {
  res.sendFile(`${__dirname}/public/stats.html`);
});

app.get("/exercise", (req, res) => {
  res.sendFile(`${__dirname}/public/exercise.html`);
});

//Api Routes

//Get all Workouts
app.get("/api/workouts", async (req, res) => {
  try {
    const workoutsData = await Workout.find({});
    if(!workoutsData.length) {
      res.status(404).json({message:"No Workouts found in the database"});
    } else {
      res.status(200).json(workoutsData);
    }
  } catch(err) {
    res.status(500).json(err);
  }
});

//Create New Workout
app.post("/api/workouts", async (req, res) => {
  try {
    const newWorkoutData = await Workout.create(req.body);
    console.log(newWorkoutData);
    res.status(200).json(newWorkoutData);
  } catch(err) {
    res.status(500).json(err);
  }
});

app.put("/api/workouts/:id", async (req, res) => { //Work in progress, pending to ensure workouts are pushed to the array.
  try {
    console.log(req.body);
    const workoutData = await Workout.findByIdAndUpdate({_id: req.params.id}, {exercises: req.body});
    console.log(workoutData);
    res.status(200).json(req.body);
  } catch(err) {
    res.status(500).json(err);
  }
});
//
// app.get("/api/workouts/range", async (req, res) => {
//
// });



app.listen(PORT, () => {
  console.log("Server running!");
});