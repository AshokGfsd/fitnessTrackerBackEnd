const User = require("../models/users");
const Food = require("../models/food");

const foodController = {
  getAllFoodsController: async (request, response) => {
    try {
      const userId = request.userId;
      const foods = await Food.find({ user: userId }).sort({ _id: -1 });
      response.status(200).json({ messsage: "Fetched all foods", foods });
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  },
  getTodayFoodsController: async (request, response) => {
    try {
      const userId = request.userId;
      const today = new Date();
      const day = today.getDate();
      const month = today.getMonth();
      const year = today.getFullYear();
      const foods = await Food.find({
        user: userId,
        createdAt: {
          $gte: new Date(year, month, day),
          $lt: new Date(year, month, day + 1),
        },
      }).sort({ _id: -1 });
      response.status(200).json({ messsage: "Fetched all foods", foods });
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  },
  createFoodController: async (request, response) => {
    try {
      const { _id, calories, carbohydrates, fat, foodName, protein } =
        request.body;
      const userId = request.userId;
      const newFood = new Food({
        calories,
        carbohydrates,
        fat,
        foodName,
        protein,
        user: userId,
      });
      const savedFood = await newFood.save();
      if (_id) {
        await User.findByIdAndUpdate(userId, {
          $pull: {
            suggestions: { $in: [_id] },
          },
        });
      }
      response.status(200).json({ messsage: "Food created", savedFood });
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  },
  deleteFoodController: async (request, response) => {
    try {
      const { foodId } = request.params;
      const food = await Food.findByIdAndDelete(foodId);
      if (!food) {
        return response
          .status(400)
          .json({ message: "Incorrect ID no food found" });
      }
      response.status(200).json({ messsage: "Food deleted" });
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  },
  update: async (request, response) => {
    try {
      const { foodName, calories, protein, carbohydrates, fat } = request.body;
      const { foodId: _id } = request.params;
      const food = await Food.findById(_id);
      const userId = request.userId;
      if (!food) {
        return response.status(404).send({ message: "food not found" });
      }
      const updatedAt = new Date();

      const updatefood = await Food.findByIdAndUpdate(
        _id,
        {
          foodName,
          calories: +calories,
          protein: +protein,
          fat: +fat,
          carbohydrates: +carbohydrates,
          updatedAt,
        },
        { new: true }
      );

      response.status(200).json({ message: "update successfully", updatefood });
    } catch (error) {
      response.status(500).send({ message: error.message });
    }
  },
};

module.exports = foodController;
