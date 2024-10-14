import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home";
import ArithPage from "./pages/arithmetic"
import PageNotFound from "./pages/404";
import './App.css';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/" element={ <HomePage/> } />
        <Route path="/arithmetic" element={ <ArithPage/> }/>
        <Route path="*" element={ <PageNotFound/> }/>
      </BrowserRouter>
    </div>
  );
}

export default App;
