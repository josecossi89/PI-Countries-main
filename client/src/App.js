import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import LandingPage from "./components/LandingPage/LandingPage.jsx";
import Home from "./components/Home/Home.jsx";
import CreateActivity from "./components/CreateActivity/CreateActivity.jsx";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<LandingPage />}></Route>
          <Route path="/countries" element={<Home />}></Route>
          <Route path="/activity" element={<CreateActivity />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
