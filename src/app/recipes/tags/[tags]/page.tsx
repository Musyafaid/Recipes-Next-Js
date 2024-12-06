import Link from "next/link";
import React from "react";
import Image from "next/image";

const getDataByTags = async (tags: string) => {
  const res = await fetch(`https://dummyjson.com/recipes/tag/${tags}`);
  const data = await res.json();
  const recipesWithSlug = data.recipes.map((recipe: any) => ({
    ...recipe,
    slug: recipe.name
      .toLowerCase()
      .replace(/\s+/g, "-") // Ganti spasi dengan -
      .replace(/[^a-z0-9\-]/g, ""), // Hapus karakter non-alphanumeric selain -
  }));
  return recipesWithSlug;
};

export default async function page({ params }: { params: { tags: string } }) {
  const dataRecipes = await getDataByTags(params.tags);
  return (
    <div className="flex flex-col items-center w-screen">
      <h1 className="text-4xl font-bold mb-4">Recipes</h1>
      <div className="py-3 w-full flex justify-center">
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center max-w-6xl">
          {dataRecipes.map((item: any, index: any) => (
            <li className="relative" key={index}>
              <div className="w-64 h-full bg-white rounded-lg shadow-md overflow-hidden">
                <Image
                  className="w-full h-48 object-cover"
                  width={500}  
                  height={300}
                  src={item.image}
                  alt="Recipe"
                />
                <div className="p-4">
                  <h2 className="text-xl font-bold text-gray-800">
                    {item.name}
                  </h2>
                  <p className="text-gray-600 text-sm mt-2 truncate">
                    {item.name}. Try out this amazing recipe and enjoy a
                    delightful meal with your loved ones.
                  </p>
                </div>
              </div>
              <Link
                href={`/recipes/${item.slug}/${item.id}`}
                className="top-0 h-full text-center flex justify-center items-center absolute w-full bg-transparent py-2 px-4 rounded hover:bg-gray-500/45 text-transparent hover:text-black"
              >
                View Recipe
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
