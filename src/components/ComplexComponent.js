import React, {Component} from 'react';
import { Button } from 'semantic-ui-react'
import { MakeUppercase, ConsoleStuff } from './Utilities';

class ComplexComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      test: 'hello world',
      counter: 0
    }

    this.clickHandler = this.clickHandler.bind(this);
    this.increase = this.increase.bind(this);
    this.decrease = this.decrease.bind(this);
  }

  clickHandler() {
    ConsoleStuff(this.state.test);
  }

  decrease() {
    let counter = this.state.counter;
    counter--;
    this.setState({counter});
  }

  increase() {
    let counter = this.state.counter;
    counter++;
    this.setState({counter});
  }

  render() {
    return (
      <div>
        <h3>{MakeUppercase(this.props.title)}</h3>
        <Button onClick={this.clickHandler}>Click me!</Button>
        <Button onClick={this.decrease}>-</Button>
        <Button onClick={this.increase}>+</Button>
        <p>{this.state.counter}</p>
      </div>
    );
  }
}

export default ComplexComponent;