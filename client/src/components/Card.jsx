import React from "react";

const Card = ({ course }) => {
  return (
    <>
      <div className="border-black border-2 bg-gray-300 font-mono text-black p-6 mt-2">
        {course.title} ({course.duration}) hours
      </div>
    </>
  );
};

export default Card;
