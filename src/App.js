import React from "react";
import AppRouter from "./components/Approuter";
import { BrowserRouter } from "react-router-dom";
import './styles/App.css'
function App() {
  return (
    <BrowserRouter>
      <AppRouter/>
    </BrowserRouter>
    
  );
}

export default App;
