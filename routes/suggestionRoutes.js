const express = require("express");
const auth = require("../middlewares/auth");
const suggestionController = require("../controllers/suggestionController");
const suggestionRouter = express.Router();

suggestionRouter.get(
  "/",
  auth.verifyToken,
  suggestionController.getYourSuggestionsController
);
suggestionRouter.get(
  "/user",
  auth.verifyToken,
  suggestionController.getSuggestionsByUserController
);
suggestionRouter.delete(
  "/user/:suggestionId",
  auth.verifyToken,
  suggestionController.deleteSuggestionInUserController
);
suggestionRouter.post(
  "/",
  auth.verifyToken,
  suggestionController.createSuggestionController
);
suggestionRouter.delete(
  "/:suggestionId",
  auth.verifyToken,
  suggestionController.deleteSuggestionController
);
suggestionRouter.put(
  "/:suggestionId",
  auth.verifyToken,
  suggestionController.update
);

module.exports = suggestionRouter;
