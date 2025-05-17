import { Outlet } from "react-router-dom";
import Header from "../component/header";
import Slide from "../component/Slide";
import { useState } from "react";
function Layout() {
  const [isActive, setisActive] = useState(false);
  return (
    <div className=" flex fixed top-0 left-0 h-[100vh] w-[100vw] bg-blue-50  bg-opacity-40">
      <div className=" hidden lg:block lg:w-[15%] bg-white border z-10">
        <Slide />
      </div>
      {isActive && (
        <div className=" absolute lg:w-[15%] bg-white border z-10">
          <Slide />
        </div>
      )}
      <div className=" w-full  lg:w-[85%] h-[100vh]  border">
        <div className=" h-max">
          <Header isActive={isActive} setisActive={setisActive} />
        </div>
        <div className=" h-full overflow-y-scroll overflow-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
