import React, { useContext } from 'react';
import ReactSlider from 'react-slider';
import CreateContext from './CreateContext';
import '../../global.css';

export function ContextSettings() {
    const contextProps = useContext(CreateContext);
    return (
        <div className="text-time">
            <h1>minutes: {contextProps.timeMinutes}min</h1>
            <ReactSlider className={"slider minutes border-4 border-time h-8 w-[10rem] rounded-full "} thumbClassName={"thumb"} trackClassName="track" value={contextProps.timeMinutes} onChange={newValue => contextProps.setTimeMinutes(newValue)} min={1} max={50}/>
            <h1>break time: {contextProps.breakMinutes}min</h1>
            <ReactSlider className={"slider breakTime border-4 border-time h-8 w-[10rem] rounded-full "} thumbClassName={"thumb"} trackClassName="track" value={contextProps.breakMinutes} onChange={newValue => contextProps.setBreakMinutes(newValue)} min={1} max={50}/>
        </div>
    )
}