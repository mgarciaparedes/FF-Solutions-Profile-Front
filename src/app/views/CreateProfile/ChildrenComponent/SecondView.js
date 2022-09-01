import React from "react";

const SecondView = ({ setView, username, email, password }) => {
  return (
    <>
      <div>SecondView</div>
      <div>{ username + ", "+ email + ", "+password }</div>
      <button onClick={() => setView(1)}>Previous</button>
    </>
  );
};

export default SecondView;
