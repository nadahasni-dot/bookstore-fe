import React from "react";
import Tag from "./tag";
import { getTags } from "@/services/tag";

async function TagSelector() {
  const { data: tags } = await getTags();

  return (
    <div className="flex mt-20 flex-col w-full container pt-6 px-4 md:px-8">
      <h2 className="font-semibold">Search Book by Tags</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 my-4">
        {tags.map((tag) => (
          <Tag key={tag.name} tagName={tag.name} />
        ))}
      </div>
    </div>
  );
}

export default TagSelector;
