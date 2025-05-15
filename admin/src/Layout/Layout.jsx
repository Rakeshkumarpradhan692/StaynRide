import Header from "../component/header";
import Slide from "../component/Slide";
function Layout() {
  return (
    <div className=" flex fixed top-0 left-0 h-[100vh] w-[100vw] bg-blue-50">
      <div className=" w-[25%] lg:w-[15%] bg-white border z-10">
        <Slide />
      </div>
      <div className=" w-[75%] lg:w-[85%] h-max bg-white border">
        <Header />
      </div>
    </div>
  );
}

export default Layout;
