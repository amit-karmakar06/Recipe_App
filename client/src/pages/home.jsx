import { useEffect, useState } from "react";
import axios from "axios";
import { Usegetuserid } from "../Hooks/usegetuserid";

export const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = Usegetuserid();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch("http://localhost:3001/recipes");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error("Failed to fetch recipes:", error);
      }
    };

    const fetchSavedRecipe = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/recipes/savedRecipes/ids/${userID}`
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        console.log('Fetched saved recipes:', data);
        setSavedRecipes(data.savedRecipes || []);
      } catch (error) {
        console.error("Failed to fetch saved recipes:", error);
      }
    };

    fetchSavedRecipe();
    fetchRecipe();
  }, [userID]);

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put("http://localhost:3001/recipes", {
        recipeID,
        userID,
      });
      setSavedRecipes(response.data.savedRecipes || []);
    } catch (error) {
      console.error("Failed to save recipe:", error);
    }
  };

  const isRecipeSaved = (recipeID) => Array.isArray(savedRecipes) && savedRecipes.includes(recipeID);

  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="font-extrabold text-6xl mt-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">
        Delicious Recipes
      </h1>
      <ul className="flex flex-col items-center mt-12 space-y-12 bg-white">
        {recipes.map((recipe) => (
          <li key={recipe._id} className="border-none container w-10/12 md:w-8/12 lg:w-6/12 bg-white shadow-2xl rounded-2xl overflow-hidden transform transition duration-500 hover:scale-105">
            <div className="flex flex-col items-center p-6 ">
              <h2 className="text-4xl font-bold text-gray-800 mb-4 tracking-wide">{recipe.name}</h2>
              <img
                src={recipe.imageUrl}
                alt={recipe.name}
                className="w-full h-64 object-cover rounded-lg shadow-lg mb-6"
              />
              <div className="instructions text-gray-700 text-lg leading-relaxed mb-6 text-center">
                <p>{recipe.instructions}</p>
              </div>
              <p className="text-gray-600 font-semibold mb-4">Cooking time: {recipe.cookingtime} minutes</p>
              <button
                onClick={() => saveRecipe(recipe._id)}
                disabled={isRecipeSaved(recipe._id)}
                className={`py-2 px-8 rounded-full font-medium text-lg tracking-wider transform transition-all duration-300 ${
                  isRecipeSaved(recipe._id)
                    ? "bg-green-500 text-white cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:shadow-lg hover:from-indigo-500 hover:to-blue-500"
                }`}
              >
                {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
