import React from "react";

export default function CardComponent({ img, title, text }) {
  return (
    <div>
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
        <img
          src={img}
          alt={title}
          className="h-full w-full object-cover object-center group-hover:opacity-75"
        />
      </div>
      <h1 className="mt-4 text-lg font-medium text-gray-700">{title}</h1>
      <p className="mt-1 text-sm font-medium text-gray-900">{text}</p>
    </div>
  );
}

// aspect-h-1 aspect-w-1 lg:w-full overflow-hidden rounded-md bg-gray-900 lg:aspect-none group-hover:opacity-75 h-80
