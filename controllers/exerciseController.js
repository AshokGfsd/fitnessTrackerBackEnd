const User = require("../models/users");
const Exercise = require("../models/exercise");

const exerciseController = {
  getAllExercisesController: async (request, response) => {
    try {
      const userId = request.userId;
      const exercises = await Exercise.find({ user: userId }).sort({ _id: -1 });
      response
        .status(200)
        .json({ messsage: "Fetched all exercies", exercises });
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  },
  getTodayExercisesController: async (request, response) => {
    try {
      const userId = request.userId;
      const today = new Date();
      const day = today.getDate();
      const month = today.getMonth();
      const year = today.getFullYear();
      const exercises = await Exercise.find({
        user: userId,
        createdAt: {
          $gte: new Date(year, month, day),
          $lt: new Date(year, month, day + 1),
        },
      }).sort({ _id: -1 });
      response
        .status(200)
        .json({ messsage: "Fetched all exercies", exercises });
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  },
  createExerciseController: async (request, response) => {
    try {
      const { _id, caloriesBurnt, duration, exerciseType, name } = request.body;
      const userId = request.userId;
      const newExercise = new Exercise({
        caloriesBurnt,
        duration,
        exerciseType,
        name,
        user: userId,
      });
      const savedExercise = await newExercise.save();
      if (_id) {
        await User.findByIdAndUpdate(userId, {
          $pull: {
            suggestions: { $in: [_id] },
          },
        });
      }
      response
        .status(200)
        .json({ messsage: "Exercise created", savedExercise });
    } catch (error) {
      console.log(error);
      response.status(500).json({ error: error.message });
    }
  },
  deleteExerciseController: async (request, response) => {
    try {
      const { exerciseId } = request.params;
      const exercise = await Exercise.findByIdAndDelete(exerciseId);
      if (!exercise) {
        return response
          .status(400)
          .json({ message: "Incorrect ID no exercise found" });
      }
      response.status(200).json({ messsage: "Exercise deleted", exercise });
    } catch (error) {
      console.log(error, "asds");
      response.status(500).json({ error: error.message });
    }
  },
  update: async (request, response) => {
    try {
      const { exerciseId: _id } = request.params;

      const { name, duration, exerciseType, caloriesBurnt } = request.body;
      const exercise = await Exercise.findById(_id);

      const userId = request.userId;
      if (!exercise) {
        return response.status(404).send({ message: "exercise not found" });
      }

      const updatedAt = new Date();
      const updateExercise = await Exercise.findByIdAndUpdate(
        _id,
        {
          name,
          duration,
          exerciseType,
          caloriesBurnt,
          updatedAt,
        },
        { new: true }
      );
      console.log(updateExercise);
      response
        .status(200)
        .json({ message: "update successfully", updateExercise });
    } catch (error) {
      response.status(500).send({ message: error.message });
    }
  },
};

module.exports = exerciseController;
