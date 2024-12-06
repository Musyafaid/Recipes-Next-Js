import Link from "next/link";
import React from "react";
const getTags = async () => {
  const res = await fetch("https://dummyjson.com/recipes/tags");
  return await res.json();
};

export default async function Tags() {
  const dataTags = await getTags();
  return (
    <div className="w-screen  flex justify-center">
      <ul className="flex w-3/4 justify-between flex-wrap gap-2 ">
        {dataTags.map((tags: string, index: any) => (
          <li className="my-2 flex-shrink-0" key={index}>
            <Link
              className="p-2 w-fit bg-gray-600 text-white shadow whitespace-nowrap"
              href={`/recipes/tags/${tags}`}
            >
              {tags}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
