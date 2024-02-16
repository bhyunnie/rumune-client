import "./App.css";
// import strawberry_yellow from "./global/assets/images/strawberry-yellow.png";
// import omurice from "./global/assets/images/omurice.png";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Shop from "./pages/Shop";
import Home from "./pages/Home";
import ContactButton from "./components/ContactButton";
import React from "react";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <div id="App">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/shop" element={<Shop />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
        <ContactButton />
      </div>
    </BrowserRouter>
  );
}

export default App;
