import React from 'react';
import ComplexComponent from './ComplexComponent';

const title = 'test';
const wrapper = shallow(<ComplexComponent title={title} />);

describe('(Component) ComplexComponent', () => {
  describe('render()', () => {
    it('should render the component', () => {
      expect(wrapper.find('div').length).toBe(1);
    });

    it('should render the title', () => {
      expect(wrapper.find('h3').text()).toEqual(title.toUpperCase());
    });
  });
});