import React from "react";

const StatsSection = () => {
  return (
    <div className="bg-black p-6 ">
      <section className="text-white  body-font">
      <div className="container mx-auto">
        <div className="flex flex-wrap -m-4 text-center">
          <div className="p-4 sm:w-1/4 w-1/2">
            <h2 className="title-font font-medium sm:text-4xl text-3xl text-blue-400">2.7K</h2>
            <p className="leading-relaxed">Users</p>
          </div>
          <div className="p-4 sm:w-1/4 w-1/2">
            <h2 className="title-font font-medium sm:text-4xl text-3xl text-blue-400">1.8K</h2>
            <p className="leading-relaxed">Subscribes</p>
          </div>
          <div className="p-4 sm:w-1/4 w-1/2">
            <h2 className="title-font font-medium sm:text-4xl text-3xl text-blue-400">35</h2>
            <p className="leading-relaxed">Downloads</p>
          </div>
          <div className="p-4 sm:w-1/4 w-1/2">
            <h2 className="title-font font-medium sm:text-4xl text-3xl text-blue-400">4</h2>
            <p className="leading-relaxed">Products</p>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
};

export default StatsSection;
