import React from 'react';
import ComplexComponent from './ComplexComponent';
import * as Utilities from './Utilities';
import renderer from 'react-test-renderer';

const title = 'test';
const wrapper = shallow(<ComplexComponent title={title} />);

describe('(Component) ComplexComponent', () => {

  const tree = renderer.create(
    <ComplexComponent title={title} />
  ).toJSON();

  beforeEach(() => {
    wrapper.setState({counter: 0});
  });

  describe('render()', () => {
    it('should render the component', () => {
      expect(wrapper.find('div').length).toBe(1);
      expect(tree).toMatchSnapshot();
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