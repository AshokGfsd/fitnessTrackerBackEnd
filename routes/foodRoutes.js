const express = require("express");
const auth = require("../middlewares/auth");
const foodController = require("../controllers/foodController");
const foodRouter = express.Router();

foodRouter.get(
  "/",
  auth.verifyToken,
  foodController.getAllFoodsController
);
foodRouter.get(
  "/today",
  auth.verifyToken,
  foodController.getTodayFoodsController
);
foodRouter.post(
  "/",
  auth.verifyToken,
  foodController.createFoodController
);

foodRouter.delete(
  "/:foodId",
  auth.verifyToken,
  foodController.deleteFoodController
);
foodRouter.put(
  "/:foodId",
  auth.verifyToken,
  foodController.update
);
module.exports = foodRouter;
