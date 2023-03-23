import React from "react";
const MyHeading = ()=> <h1>Heading from seperate file as react component.</h1>;

// props destructing expample
const MyHeading1 = ({name,price}) =>  {
    return(
        <>
            <h1>Second Heading from same component now with props destructuring {name} </h1>
            <MyHeading2 value={price} />
        </>
    )
};
// another way of exporting

export const MyHeading2 = ({value}) =>  <div>export function as different method from props {value}</div>;

// time for props
export const MyHeading3 = (props) =>  {
    const obj = {
        abc: 'sid',
        bcc:'jain'
    };
    //destructing
    const {abc,bcc}= obj;
    return(
        <>
            <h1>{props.name}</h1>
            <h2>{props.text}</h2>
            <h3> From Props</h3>
            <h1>{abc} by destructuring</h1>
            <h1>{bcc} by destructuring</h1>
        </>
    )
};

export default MyHeading;

export {MyHeading1};