import { Route, Routes } from "react-router-dom";
import "./App.css";
import Create from "./components/Create";
import Edit from "./components/Edit";
import { Home } from "./components/Home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/edit" element={<Edit></Edit>}></Route>
        <Route path="/create" element={<Create></Create>}></Route>
      </Routes>
    </div>
  );
}

export default App;
