import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem'

configure({ adapter: new Adapter() });

describe('<NavigationItems />', () => {

  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<NavigationItems />);
  })

  it('should render only two navigationItem ', () => {
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });

  it('should render only three navigationItem ', () => {
    wrapper.setProps({ isAuth: true })
    //wrapper = shallow(<NavigationItems isAuth={true} />)
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });

  it('should contain logout navigation if authenticated ', () => {
    wrapper.setProps({ isAuth: true })
    expect(wrapper.contains(<NavigationItem link="/logout" >Log Out</NavigationItem>)).toEqual(true);
  });

});