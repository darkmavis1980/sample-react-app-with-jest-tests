import React from 'react';
import ComplexComponent from './ComplexComponent';
import * as Utilities from './Utilities';

const title = 'test';
const wrapper = shallow(<ComplexComponent title={title} />);

describe('(Component) ComplexComponent', () => {
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
  });

  describe('clickHandler()', () => {
    it('should call the ConsoleStuff function', () => {
      const spy = jest.spyOn(Utilities,'ConsoleStuff');
      wrapper.instance().clickHandler();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('decrease()', () => {

  });

  describe('increase()', () => {

  });
});