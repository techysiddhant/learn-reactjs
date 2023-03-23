// import the component
import MyHeading from "./components/MyHeading";
// importing another component from the same component file
import {MyHeading1,MyHeading2, MyHeading3} from "./components/MyHeading"
//import the style file
import './style/App.css';
import Header from "./components/Header";
import './style/Header.css';

import {BrowserRouter as Router} from 'react-router-dom'
const rs = 9000;
// using arrow function
const Heading = ()=> <h1>Hello form arrow function</h1>;
function App(){
  // we can write js before return tag
  const name = "siddhant";
  return(
    // Use empty tag for return multiple div tags
    <>
    <Header />
    <div>
      <h1>Hello</h1>
      {/*  JSX */}
      <h2>Hello money {rs}</h2>
      <p>Name from JS {name}</p>
      {/* now using arrow function as component */}
      <Heading />
      <MyHeading />
      <MyHeading1 name="siddhantjain" price={232323} />
      <MyHeading2 />
      <MyHeading3 name="Siddhant" text="pass the data props" />
      
    </div>
    <div>
      <h1>HEllo from another div tag</h1>
    </div>
    </>
  )
}
export default App;