const Suggestion = require("../models/suggestion");
const User = require("../models/users");

const suggestionController = {
  getYourSuggestionsController: async (request, response) => {
    try {
      const userId = request.userId;
      const suggestions = await Suggestion.find({ user: userId });
      response
        .status(200)
        .json({ messsage: "Fetched all suggestions", suggestions });
    } catch (error) {
      console.log(error);
      response.status(500).json({ error: error.message });
    }
  },
  getSuggestionsByUserController: async (request, response) => {
    try {
      const userId = request.userId;
      const { suggestions } = await User.findById(userId)
        .populate("suggestions")
        .lean();
      response
        .status(200)
        .json({ messsage: "Fetched Today suggestions", suggestions });
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  },
  createSuggestionController: async (request, response) => {
    try {
      const { age, gender, stage, type } = request.body;
      const userId = request.userId;
      let details = { ...request.body };
      const ageLimit = age.split("-");
      delete details.age;
      delete details.gender;
      delete details.stage;
      delete details.type;
      const newSuggestion = new Suggestion({
        details,
        user: userId,
        age,
        gender,
        stage,
        type,
      });
      const savedSuggestion = await newSuggestion.save();
      let BMI = { gte: null, lt: null };
      if (stage == "Under weight") {
        BMI.gte = 0;
        BMI.lt = 18.5;
      } else if (stage == "Normal weight") {
        BMI.gte = 18.5;
        BMI.lt = 24.9;
      } else if (stage == "Over weight") {
        BMI.gte = 24.9;
        BMI.lt = 29.9;
      } else if (stage == "Obese") {
        BMI.gte = 29.9;
        BMI.lt = 100;
      }
      await User.updateMany(
        {
          BMI: {
            $gte: BMI.gte,
            $lt: BMI.lt,
          },
          age: {
            $gte: ageLimit[0],
            $lt: ageLimit[1],
          },
          gender,
        },
        {
          $push: { suggestions: savedSuggestion._id },
        },
        { new: true }
      );
      response
        .status(200)
        .json({ messsage: "suggestion created", savedSuggestion });
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  },
  deleteSuggestionController: async (request, response) => {
    try {
      const { suggestionId } = request.params;
      const userId = request.userId;
      const suggestion = await Suggestion.findById(suggestionId);
      if (!suggestion) {
        return response
          .status(400)
          .json({ message: "Incorrect ID no suggestion found" });
      }
      if (suggestion.user.toString() != userId) {
        return response.status(400).json({
          message: "its can't delete by your only creater can be delete",
        });
      }
      await Suggestion.findByIdAndDelete(suggestionId);
      await User.updateMany(
        { suggestions: suggestionId },
        {
          $pull: {
            suggestions: { $in: [suggestionId] },
          },
        }
      );

      response.status(200).json({ messsage: "suggestion deleted" });
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  },
  deleteSuggestionInUserController: async (request, response) => {
    try {
      const userId = request.userId;
      const { suggestionId } = request.params;

      const user = await User.findByIdAndUpdate(userId, {
        $pull: {
          suggestions: { $in: [suggestionId] },
        },
      });

      if (!user) {
        return response
          .status(400)
          .json({ message: "Incorrect ID no suggestion found" });
      }

      response.status(200).json({ messsage: "suggestion deleted" });
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  },
  update: async (request, response) => {
    try {
      const { _id, age, gender, stage, type } = request.body;
      const userId = request.userId;
      let details = { ...request.body };
      const ageLimit = age.split("-");
      delete details.age;
      delete details.gender;
      delete details.stage;
      delete details.type;
      delete details._id;
      const suggestion = await Suggestion.findById(_id);
      if (!suggestion) {
        return response.status(404).send({ message: "suggestion not found" });
      }
      if (suggestion.user != userId) {
        return response.status(404).send({ message: "suggestion not found" });
      }

      const updatedAt = new Date();
      const updateSuggestion = await Suggestion.findByIdAndUpdate(
        _id,
        {
          details,
          age,
          gender,
          stage,
          type,
          updatedAt,
        },
        { new: true }
      );
      let BMI = { gte: null, lt: null };
      if (stage == "Under weight") {
        BMI.gte = 0;
        BMI.lt = 18.5;
      } else if (stage == "Normal weight") {
        BMI.gte = 18.5;
        BMI.lt = 24.9;
      } else if (stage == "Over weight") {
        BMI.gte = 24.9;
        BMI.lt = 29.9;
      } else if (stage == "Obese") {
        BMI.gte = 29.9;
        BMI.lt = 100;
      }
      await User.updateMany(
        { suggestions: _id },
        {
          $pull: {
            suggestions: { $in: [_id] },
          },
        }
      );
      await User.updateMany(
        {
          BMI: {
            $gte: BMI.gte,
            $lt: BMI.lt,
          },
          age: {
            $gte: ageLimit[0],
            $lt: ageLimit[1],
          },
          gender,
        },
        {
          $push: { suggestions: _id },
        },
        { new: true }
      );
      response
        .status(200)
        .json({ message: "update successfully", updateSuggestion });
    } catch (error) {
      response.status(500).send({ message: error.message });
    }
  },
};

module.exports = suggestionController;
