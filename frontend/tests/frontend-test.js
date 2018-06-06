import React from 'react';
import { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15.4'
const Enzyme = require('enzyme');
Enzyme.configure({ adapter: new Adapter() })
import Weather from '../src/app.jsx';

const assert = require('assert');

describe("Test frontend functions", function() {
  it("updateState", async function() {
    var location = {
      "coords": {
        "latitude": 65,
        "longitude": 20
      }
    };
    //const weather = new Weather();
    const wrapper = shallow(<Weather />);
    const instance = wrapper.instance();
    await instance.updateState(location);
    assert.equal(instance.state.latitude, 65);
    assert.equal(instance.state.longitude, 20);
  });
});
