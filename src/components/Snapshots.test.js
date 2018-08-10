import React from 'react';
import Snapshots from './Snapshots';
import renderer from 'react-test-renderer';

describe('(Component) Snapshots', () => {

  const tree = renderer.create(
    <Snapshots />
  ).toJSON();

  describe('render()', () => {
    it('should render the component', () => {
      expect(tree).toMatchSnapshot();
    });
  });

});