import { Route, Routes } from "react-router-dom";
import "./App.css";
import Edit from "./components/Edit";
import { Home } from "./components/Home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/edit" element={<Edit></Edit>}></Route>
      </Routes>
    </div>
  );
}

export default App;
