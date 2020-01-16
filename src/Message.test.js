import React from 'react';
import { shallow, mount } from 'enzyme';
import Message from './Message.js';
import TrafficLight from './App.js';
import {crossTheStreet} from './App';

beforeEach(() => {
    jest.resetModules();
});

afterEach(() => {
    jest.clearAllTimers();
})

test('Component to render one message div', () => {
    const wrapper = shallow(<Message/>);
    expect(wrapper.find('p')).toHaveLength(1);
});

describe('Text and style changes', () => {
    it('Initial text and style in message div', () => {
        
        const App = mount(<TrafficLight />);
        expect(App.state('messageIsVisible')).toBe(false);
        App.find('button').simulate('click');
        App.setState({messageIsVisible: true, clicked: false});
        const wrapper = mount(<Message note="Please do not cross!"/>);
        expect(wrapper.containsMatchingElement(<div><p>Please do not cross!</p></div>)).toBeTruthy();
    });

    it('New text and style 10 seconds after click', () => {
        const App = shallow(<TrafficLight />);
        const wrapper = mount(<Message note="Please do not cross!"/>);
        
        expect(App.state('messageIsVisible')).toBe(false);
        App.setState({messageIsVisible: true, timer: 1, clicked: true});
        wrapper.setProps({ time: 1, note: "Please do not cross!" });
        App.find('button').simulate('click');
        wrapper.update();
        jest.useFakeTimers();
        App.instance().crossTheStreet();
        jest.advanceTimersByTime(1000);
        
        expect(wrapper.prop('note')).toBe('Please do not cross!');
        expect(wrapper.prop('time')).toBe(1);
        expect(wrapper.containsMatchingElement(<div><p>Please do not cross!</p></div>)).toBeTruthy();
        expect(wrapper.find('p').hasClass('doNotCross')).toBe(true);
        jest.advanceTimersByTime(10000);
        wrapper.setProps({ time: 10, note: "Please cross!" });

        expect(wrapper.prop('note')).toBe('Please cross!');
        expect(wrapper.prop('time')).toBe(10);
        expect(wrapper.containsMatchingElement(<div><p>Please cross!</p></div>)).toBeTruthy();
        expect(wrapper.find('#msgDiv').hasClass('pleaseCross')).toBe(true);

        jest.useRealTimers();
    });

});