import React from 'react';

const NoTest = (props) => {

  function something() {
    return props.doSomething ? <p>Hello!</p> : null
  }

  return (
    <div>
      <h1>Should I do something</h1>
      { something }
    </div>
  )
}

export default NoTest;