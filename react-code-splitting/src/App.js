import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
// import Home from './Home';
// import About from './About';
// use lazy for dynamic import the components
import { lazy, Suspense } from 'react';
// like this
const Home = lazy(()=>import("./Home"));
const About = lazy(()=>import("./About"));
// from this dynamic components import did not allow to all JSX code into bundle.js
function App() {
  return (
    <Router>
      {/* It works as a loader */}
      <Suspense fallback={<div>Loading......</div>}>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/about' element={<About/>} />
      </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
