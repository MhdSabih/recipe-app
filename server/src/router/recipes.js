import express from "express";
import { verifyUser } from "../middleware/user-middleware.js";
import { RecipeModel } from "../models/Recipes.js";
import { UserModel } from "../models/User.js";

const router = express();

router.get("/", async (req, res) => {
  try {
    const response = await RecipeModel.find({});
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

router.post("/", verifyUser, async (req, res) => {
  console.log(req.body);
  const recipe = new RecipeModel(req.body);
  try {
    const response = await recipe.save();
    console.log(response);
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

router.put("/", verifyUser, async (req, res) => {
  try {
    const recipe = await RecipeModel.findById(req.body.recipeID);
    const user = await UserModel.findById(req.body.userID);
    console.log(recipe._id);
    user.savedRecipes.push(recipe._id);
    console.log(user.savedRecipes);
    const response = await user.save();
    res.json({ savedRecipes: response.savedRecipes });
  } catch (err) {
    res.json(err);
  }
});

router.get("/savedRecipes/ids/:userID", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userID);
    res.json({ savedRecipes: user?.savedRecipes });
  } catch (err) {
    res.json(err);
  }
});

router.get("/savedRecipes/:userID", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userID);
    console.log(user._id);
    const savedRecipes = await RecipeModel.find({
      _id: { $in: user.savedRecipes },
    });
    res.json({ savedRecipes });
  } catch (err) {
    res.json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const recipe = await RecipeModel.findByIdAndDelete(req.params.id);
    if (!recipe) {
      res.status(400).send();
    }
    res.send(recipe);
  } catch (err) {
    res.json(err);
  }
});
export { router as RecipeRouter };
