import Weather from '../src/app.jsx';
import React from 'react';
import Adapter from 'enzyme-adapter-react-15.4';
import { shallow } from 'enzyme';

const Enzyme = require('enzyme');
const assert = require('assert');

Enzyme.configure({ adapter: new Adapter() });

describe('Test frontend functions', function () {
  it('updateState', async function () {
    const location = {
      coords: {
        latitude: 65,
        longitude: 20,
      },
    };
    const wrapper = shallow(<Weather />);
    const instance = wrapper.instance();
    await instance.updateState(location);
    assert.equal(instance.state.latitude, 65);
    assert.equal(instance.state.longitude, 20);
  });
});
