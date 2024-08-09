import { useEffect, useState } from "react";
import axios from "axios";
import { Usegetuserid } from "../Hooks/usegetuserid";

export const SavedRecipe = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userID = Usegetuserid();

  useEffect(() => {
    const fetchSavedRecipe = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
        console.log(response.data);
      } catch (error) {
        console.log("Failed to fetch saved recipes:", error);
      }
    };

    if (userID) { // Only fetch if userID is available
      fetchSavedRecipe();
    }
  }, [userID]); // Include userID in the dependency array

  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="font-extrabold text-6xl mt-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">
        Saved Recipes
      </h1>
      <ul className="flex flex-col items-center mt-12 space-y-12 bg-white">
        {savedRecipes.map((recipe) => (
          <li key={recipe._id} className="border-none container w-10/12 md:w-8/12 lg:w-6/12 bg-white shadow-2xl rounded-2xl overflow-hidden transform transition duration-500 hover:scale-105">
            <div className="flex flex-col items-center p-6 ">
              <h2  className="text-4xl font-bold text-gray-800 mb-4 tracking-wide">{recipe.name}</h2>
            </div>
            <div className="instructions text-gray-700 text-lg leading-relaxed mb-6 text-center">
              <p>{recipe.instructions}</p>
            </div>
            <img src={recipe.imageUrl} alt={recipe.name} className="w-[513px] ml-[7.5rem] h-64 object-cover rounded-lg shadow-lg mb-6 " />
            <p className="text-gray-600 font-semibold mb-4">Cooking time: {recipe.cookingtime} (Minutes)</p>
          </li>
        ))}
      </ul>
    </div>

    
  );
};
