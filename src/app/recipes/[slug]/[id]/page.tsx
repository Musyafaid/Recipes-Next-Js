import Link from 'next/link';
import React from 'react'

const getRecipeDetail = async (id:Number) =>{
    const res = await fetch (`https://dummyjson.com/recipes/${id}`)
    return  res.json()
}

type Recipe = {
    id: number;
    name: string;
    ingredients: string[];
    instructions: string[];
    prepTimeMinutes: number;
    cookTimeMinutes: number;
    servings: number;
    difficulty: string;
    cuisine: string;
    caloriesPerServing: number;
    tags: string[];
    userId: number;
    image: string;
    rating: number;
    reviewCount: number;
    mealType: string[];
  };

export default async function page({params} : {params : {id :any}}) {
    const data:Recipe = await getRecipeDetail(params.id)
  return (
    <div>
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className=" text-black font-bold text-3xl shadow-lg">{data.name}</div>
      <div className="relative">
        <img className="w-full h-72 object-cover" src={data.image} alt={data.name} />
      </div>

      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold text-gray-700">Cuisine: {data.cuisine}</span>
          <span className="text-lg font-semibold text-gray-700">Difficulty: {data.difficulty}</span>
          <span className="text-lg font-semibold text-gray-700">Prep Time: {data.prepTimeMinutes} mins</span>
        </div>

        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">Ingredients</h3>
          <ul className="list-disc pl-5 space-y-2">
            {data.ingredients.map((ingredient, index) => (
              <li key={index} className="text-gray-600">{ingredient}</li>
            ))}
          </ul>
        </div>

        {/* Instructions List */}
        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">Instructions</h3>
          <ol className="list-decimal pl-5 space-y-2">
            {data.instructions.map((instruction, index) => (
              <li key={index} className="text-gray-600">{instruction}</li>
            ))}
          </ol>
        </div>

        {/* Recipe Stats */}
        <div className="flex justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <span>Rating: {data.rating} ⭐</span>
            <span>({data.reviewCount} reviews)</span>
          </div>
          <div className="flex items-center space-x-2">
            <span>Servings: {data.servings}</span>
            <span>Calories: {data.caloriesPerServing} kcal</span>
          </div>
        </div>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          {data.tags.map((tag, index) => (
            <Link
            className="p-2 w-fit bg-gray-600 text-white shadow whitespace-nowrap"
            href={`/recipes/tags/${tag}`}
          >
            {tag}
          </Link>
          ))}
        </div>
      </div>
    </div>
    </div>
  )
}
