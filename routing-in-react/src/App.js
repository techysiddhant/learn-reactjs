import React from "react";
// React Router dom
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Header from "./components/Header";
import './styles/Header.css';
import Product from "./components/Product";
const App = () => {
  return (
    <Router>
        <Header/>
        <Routes>
            <Route path="/" element={ <Home/> } />
            <Route path="/about" element={ <About/> } />
            <Route path="/contact" element={ <Contact/> } />
            <Route path="/product/:id" element={ <Product/> } />
            {/* for all Routes */}
            <Route path="*" element={ <h1>Page Not Found!!!</h1> } />
        </Routes>
    </Router>
  );
};

export default App;
