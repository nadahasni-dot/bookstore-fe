import Spinner from "@/components/ui/spinner";
import React from "react";

function Loading() {
  return (
    <div className="flex-grow flex justify-center items-center container px-4 md:px-8 mt-24">
      <Spinner />
    </div>
  );
}

export default Loading;
