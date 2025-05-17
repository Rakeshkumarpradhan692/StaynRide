import "./App.css";
import RouteProvider from "./Routes/RouteProvider";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <>
      <Toaster />
      <RouteProvider />
    </>
  );
}

export default App;
