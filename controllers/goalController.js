const Goal = require("../models/goals");
const User = require("../models/users");

const goalController = {
  getAllGoalsController: async (request, response) => {
    try {
      const userId = request.userId;
      const goals = await Goal.find({ user: userId }).sort({ _id: -1 });
      response.status(200).json({ messsage: "Fetched all goals", goals });
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  },
  getTodayGoalsController: async (request, response) => {
    try {
      const userId = request.userId;
      const today = new Date();
      const day = today.getDate();
      const month = today.getMonth();
      const year = today.getFullYear();
      const goals = await Goal.find({
        user: userId,
        createdAt: {
          $gte: new Date(year, month, day),
          $lt: new Date(year, month, day + 1),
        },
      }).sort({ _id: -1 });
      response.status(200).json({ messsage: "Fetched all goals", goals });
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  },
  createGoalController: async (request, response) => {
    try {
      const {
        _id,
        goalDescription,
        goalName,
        status,
        targetCaloriesValue,
        targetDate,
      } = request.body;
      const userId = request.userId;
      const newGoal = new Goal({
        goalDescription,
        goalName,
        status,
        targetCaloriesValue,
        targetDate,
        user: userId,
      });
      if (_id) {
        await User.findByIdAndUpdate(userId, {
          $pull: {
            suggestions: { $in: [_id] },
          },
        });
      }
      const savedGoal = await newGoal.save();
      response.status(200).json({ messsage: "Goal created", savedGoal });
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  },
  deleteGoalController: async (request, response) => {
    try {
      const { goalId } = request.params;
      const goal = await Goal.findByIdAndDelete(goalId);
      if (!goal) {
        return response
          .status(400)
          .json({ message: "Incorrect ID no goal found" });
      }
      response.status(200).json({ messsage: "Goal deleted" });
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  },
  update: async (request, response) => {
    try {
      const {
        _id,
        goalName,
        goalDescription,
        targetDate,
        targetCaloriesValue,
        status,
      } = request.body;
      const goal = await Goal.findById(_id);
      const userId = request.userId;
      if (!goal) {
        return response.status(404).send({ message: "Goal not found" });
      }
      const updatedAt = new Date();

      const updateGoal = await Goal.findByIdAndUpdate(
        _id,
        {
          goalName,
          goalDescription,
          targetDate,
          targetCaloriesValue,
          status,
          updatedAt,
        },
        { new: true }
      );
      response.status(200).json({ message: "update successfully", updateGoal });
    } catch (error) {
      response.status(500).send({ message: error.message });
    }
  },
};

module.exports = goalController;
