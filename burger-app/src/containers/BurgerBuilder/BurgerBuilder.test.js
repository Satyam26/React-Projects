import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { BurgerBuilder } from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

configure({ adapter: new Adapter() });

describe('<BurgerBuilder />', () => {

  let wrapperComponent;

  beforeEach(() => {
    wrapperComponent = shallow(<BurgerBuilder initIngredients={() => { }} />);
  });

  it('should render BuildControls', () => {
    wrapperComponent.setProps({ ings: { salad: 0 }, tPrice: 26.567 });
    expect(wrapperComponent.find(BuildControls)).toHaveLength(1);
  })

})