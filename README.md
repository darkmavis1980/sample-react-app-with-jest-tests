# Unit Testing with Jest & Enzyme

## What are Jest and Enzyme?

* Jest is a Testing Framework create by Facebook that act as a test runner, assertion library and mocking library
* Enzyme is a JavaScript Testing utility for React created by Airbnb that provide additional testing utilities to interact with elements

## Why we need unit testing?

* Find bugs easier
* Quality of Code
* You don't approach code changes with fear anymore
* It helps other developers to understand what you have coded
* It reduces the costs on the long run because of points above



## What should I test?

* Everything, but not the children components, as they already have their own tests

## Warning!

Code ahead!

![Warning](https://media1.giphy.com/media/3ov9k9Ss9N3wO6FQ7C/giphy.gif)

## Simple example

Let's see a simple React component and how we can test it!

### The Component

```javascript
import React from 'react';

const SimpleComponent = () => {
  return (
    <div>
      <h1>Hello world</h1>
    </div>
  );
}

export default SimpleComponent;
```



### The Unit Test

```javascript
import React from 'react';
import Enzyme, { shallow, render, mount } from 'enzyme'; // not needed when jest.setup.js is set
import Adapter from 'enzyme-adapter-react-16'; // not needed when jest.setup.js is set
import SimpleComponent from './SimpleComponent';

Enzyme.configure({ adapter: new Adapter() }); // not needed when jest.setup.js is set

const wrapper = shallow(<SimpleComponent />);

describe('(Component) SimpleComponent', () => {
  it('should render the component', () => {
    expect(wrapper.find('div').length).toBe(1);
    expect(wrapper.find('div > h1').length).toBe(1);
  });
});
```



## Something more Beefy

Let see a more complex case



### The Component

```javascript
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
        <Button id="click-me-btn" onClick={this.clickHandler}>Click me!</Button>
        <Button id="decrease-btn" onClick={this.decrease}>-</Button>
        <Button id="increase-btn" onClick={this.increase}>+</Button>
        <p>{this.state.counter}</p>
      </div>
    );
  }
}

export default ComplexComponent;
```



### The Unit Test

```javascript
import React from 'react';
import ComplexComponent from './ComplexComponent';
import * as Utilities from './Utilities';

const title = 'test';
const wrapper = shallow(<ComplexComponent title={title} />);

describe('(Component) ComplexComponent', () => {

  beforeEach(() => {
    wrapper.setState({counter: 0});
  });

  describe('render()', () => {
    it('should render the component', () => {
      expect(wrapper.find('div').length).toBe(1);
    });

    it('should render the title', () => {
      expect(wrapper.find('h3').text()).toEqual(Utilities.MakeUppercase(title));
    });

    it('should call the MakeUppercase function', () => {
      const spy = jest.spyOn(Utilities,'MakeUppercase');
      shallow(<ComplexComponent title={title} />);
      expect(spy).toHaveBeenCalledWith(title);
    });

    it('should render 3 buttons', () => {
      expect(wrapper.find('Button').length).toBe(3);
    });

    it('should call the clickHandler if the user clicks on the first button', () => {
      const spy = jest.spyOn(Utilities,'ConsoleStuff');
      wrapper.find('#click-me-btn').simulate('click');
      expect(spy).toHaveBeenCalled();
    });

    it('should call the setState if the user clicks on the second and third button', () => {
      const spy = jest.spyOn(ComplexComponent.prototype,'setState');
      wrapper.find('#decrease-btn').simulate('click');
      expect(spy).toHaveBeenCalled();
      wrapper.find('#increase-btn').simulate('click');
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('clickHandler()', () => {
    it('should call the ConsoleStuff function', () => {
      const spy = jest.spyOn(Utilities,'ConsoleStuff');
      wrapper.instance().clickHandler();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('decrease()', () => {
    it('should decrease the state.counter value if invoked', () => {
      expect(wrapper.state().counter).toBe(0);
      wrapper.instance().decrease();
      expect(wrapper.state().counter).toBe(-1);
    });
  });

  describe('increase()', () => {
    it('should increase the state.counter value if invoked', () => {
      expect(wrapper.state().counter).toBe(0);
      wrapper.instance().increase();
      expect(wrapper.state().counter).toBe(1);
    });
  });
});
```



## Let's take some snapshots

Snapshots are committed with the code, and they should live alongside the unit tests.

They store a json representation of the rendered component, and can be used to compare the code generated with the code you are testing.

They can be updated by Jest if necessary or if the template changes.

## Not only components

Jest is a test framework for Javascript, not only React!



### Some generic Javascript Code

```javascript
export function MakeUppercase(word) {
  return word.toUpperCase();
}

export function ConsoleStuff(log) {
  console.log(log);
}
```



### And how to test it

```javascript
import {MakeUppercase, ConsoleStuff} from './Utilities';

describe('MakeUppercase', () => {
  it('should transform the passed string', () => {
    const myWord = 'Steve';
    const result = MakeUppercase(myWord);
    expect(result).toBe(myWord.toUpperCase());
  });
});

describe('ConsoleStuff', () => {
  it('should call the console.log', () => {
    const spy = jest.spyOn(global.console, 'log');
    const logMessage = 'Hello world';
    ConsoleStuff(logMessage);
    expect(spy).toHaveBeenCalled();
  });
});
```

## Coverage

`jest --coverage` or `npm run coverage` will create the **Coverage** report.
It uses [Istanbul](https://istanbul.js.org/) to create the report that can be outputted on the console, or generate a html report, and exports to Cobertura and Clover formats as well.

### 100% Coverage is hard, if impossible some times, but always aim to 110% coverage

![Set the volume to 11](https://support.discordapp.com/hc/article_attachments/360008528552/spinal_tap.gif)