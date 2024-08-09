import axios from "axios";
import { useState } from "react";
import { Usegetuserid } from "../Hooks/usegetuserid";
import { useNavigate } from "react-router-dom";

export const Createrecipe = () => {
  const userID = Usegetuserid();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });

  const handlechange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleingredientchange = (e, idx) => {
    const { value } = e.target;
    const ingredients = recipe.ingredients;
    ingredients[idx] = value;
    setRecipe({ ...recipe, ingredients });
  };

  const addingredient = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(recipe);
    try {
      const response = await fetch("http://localhost:3001/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipe),
      });
      if (!response.ok) {
        return window.alert("Something went wrong!!!");
      }
      alert("Recipe created successfully!!");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen ] p-4">
      <h2 className="text-3xl font-bold mb-6 text-blue-600 tracking-wide shadow-lg">
  Create Recipe
</h2>

      <form
        onSubmit={onSubmit}
        className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg"
      >
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full p-2 border border-gray-300 rounded"
            onChange={handlechange}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="ingredients"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Ingredients
          </label>
          {recipe.ingredients.map((ingredient, idx) => (
            <input
              key={idx}
              type="text"
              name={`ingredient${idx}`}
              value={ingredient}
              onChange={(e) => handleingredientchange(e, idx)}
              className="w-full p-2 border border-gray-300 rounded mb-2"
            />
          ))}
          <button
            onClick={addingredient}
            type="button"
            className="mt-2 p-2 bg-[#7C00FE] text-white rounded hover:bg-blue-600"
          >
            Add Ingredients
          </button>
        </div>

        <div className="mb-4">
          <label
            htmlFor="instructions"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Instructions
          </label>
          <textarea
            name="instructions"
            id="instructions"
            className="w-full p-2 border border-gray-300 rounded"
            onChange={handlechange}
          ></textarea>
        </div>

        <div className="mb-4">
          <label
            htmlFor="imageUrl"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Image Url
          </label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            className="w-full p-2 border border-gray-300 rounded"
            onChange={handlechange}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="cookingTime"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Cooking Time (minutes)
          </label>
          <input
            type="number"
            id="cookingTime"
            name="cookingTime"
            className="w-full p-2 border border-gray-300 rounded"
            onChange={handlechange}
          />
        </div>

        <button
          type="submit"
          className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};
