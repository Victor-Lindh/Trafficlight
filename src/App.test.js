import React from 'react';
import { shallow, mount, render } from 'enzyme';
import TrafficLight from '../src/App';
import {crossTheStreet} from '../src/App';

beforeEach(() => {
    jest.resetModules();
    });
    
    describe('App rendering elements', () => {
        test('Render 5 divs', () => {
            const App = mount(<TrafficLight />);
            expect(App.find('div')).toHaveLength(5);
        });
        test('Render one button', () => {
            const App = mount(<TrafficLight />);
            expect(App.find('button')).toHaveLength(1);
        });    
    });

    describe('Test state properties for correct initial values', () => {
        test('"clicked" state property should be false', () => {
            const App = shallow(<TrafficLight />);
            expect(App.state('clicked')).toBeFalsy();
        });
        test('"timer" state property should be set to 0', () => {
            const App = shallow(<TrafficLight />);
            expect(App.state('timer')).toBe(0);
        });
    });
    describe('Test crossTheStreet function for state changes', () => {
        test('should set state property "clicked" to "true"', () => {
            const App = mount(<TrafficLight />);
            expect(App.state('clicked')).toBe(false);
            App.find('button').simulate('click', {
                target: {clicked: true}
            });
            expect(App.state('clicked')).toBe(true);
        });

        test('should increment state variable "timer" by 1 every second', () => {
            const App = shallow(<TrafficLight />);
            jest.useFakeTimers();
            expect(App.state("timer")).toEqual(0);
            App.instance().crossTheStreet();
            jest.advanceTimersByTime(3000);
            expect(App.state("timer")).toEqual(3);
            jest.useRealTimers();
        });

        test('"timer" state variable should revert to 0 after timer ends', () => {
            const App = mount(<TrafficLight />);
            jest.useFakeTimers();
            expect(App.state('timer')).toEqual(0);
            App.instance().crossTheStreet();
            jest.advanceTimersByTime(20000);
            expect(App.state('timer')).toEqual(0);
            jest.useRealTimers();
        });
        test('"clicked" state variable should revert to "false" after timer ends', () => {
            const App = mount(<TrafficLight />);
            expect(App.state('clicked')).toBe(false);
            jest.useFakeTimers();
            App.find('button').simulate('click', {
                target: {clicked: true}
            });
            expect(App.state('clicked')).toBe(true);
            jest.advanceTimersByTime(20000);
            expect(App.state('clicked')).toBe(false);
            jest.useRealTimers();
        });
        

    });


