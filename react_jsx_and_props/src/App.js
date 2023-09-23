import './App.css';
import Header from './components/Header';
import Home from './components/Home';
// props
function MyComponent(props){
  return (
    <>
    <div>{props.name} ${props.salary}</div>
    <hr />
    </>
  );
}
// destructuring the props
// function MyComponent({name,salary}){
//   return (
//     <div>{props.name}</div>
//   );
// }
function App() {
  return (
    <div>
      <MyComponent name={"Siddhant"} salary={50000}/>
      <MyComponent name={"Samarth"} salary={50000}/>
      <MyComponent name={"Prashansa"} salary={50000}/>
      {/* Component use */}
      <Header/>
      <Home/>
    </div>
  );
}

export default App;
