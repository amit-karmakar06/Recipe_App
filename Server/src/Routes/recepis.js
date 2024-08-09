import { Recipemodel } from "../Models/Recipes.js";
import express from "express";
import mongoose from "mongoose";
import { usermodel } from "../Models/Users.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await Recipemodel.find({});
    res.json(response);
  } catch (error) {
    res.json(error);
  }
});

router.post("/", async (req, res) => {
  console.log(req.body);
  const recipe = req.body;
  let ingredients;
  recipe.ingredients.forEach((element) => {
    ingredients += `${element} `;
  });

  const newRecipe = new Recipemodel({
    name: recipe.name,
    ingredients,
    instruction: recipe.instructions,
    imageUrl: recipe.imageUrl,
    cookingtime: recipe.cookingTime,
    userOwner: recipe.userOwner,
  });
  try {
    const response = await newRecipe.save();
    console.log("recipe saved");
    console.log(response);
    res.json(response);
  } catch (error) {
    console.log(error.message);
    res.json(error);
  }
});

router.put("/", async (req, res) => {
  try {
    const recipe = await Recipemodel.findById(req.body.recipeID);
    const user = await usermodel.findById(req.body.userID);
    user.savedrecipes.push(recipe);
    await user.save();
    const response = await recipe.save();
    res.json({ savedRecipes: user.savedrecipes });
  } catch (error) {
    res.json(error);
  }
});

router.get("/savedRecipes/ids/:userID", async (req, res) => {
  console.log("request received")
  try {
    const user = await usermodel.findById(req.params.userID);
    if (!user) return;
    console.log(user.savedrecipes);
    res.json({ savedRecipes: user.savedrecipes });
  } catch (error) {
    res.json(error);
  }
});

router.get("/savedRecipes/:userID", async (req, res) => {
  try {
    const user = await usermodel.findById(req.params.userID);
    const savedRecipes = await Recipemodel.find({
      _id: { $in: user.savedrecipes },
    });
    res.json({ savedRecipes });
  } catch (error) {
    res.json(error);
  }
});
export { router as reciperouter };
