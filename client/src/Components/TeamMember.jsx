import React from "react";

const TeamMember = ({ name, role, image }) => (
  <div className="bg-white shadow-md rounded-lg p-6 text-center">
    <img
      src={image}
      alt={name}
      className="w-24 h-24 mx-auto rounded-full object-cover border-4 border-indigo-100"
    />
    <h4 className="text-lg font-semibold mt-4">{name}</h4>
    <p className="text-sm text-gray-500">{role}</p>
  </div>
);

export default TeamMember;
