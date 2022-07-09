import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { PlayIcon, CogIcon, StopIcon } from '@heroicons/react/solid';
import '../../global.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Disclosure, Switch, Transition } from '@headlessui/react'
import { ContextSettings } from '../contexts/ContextSettings';
import CreateContext from '../contexts/CreateContext';

export function PomodoroTimer(){
    const brand = '#A0AEDD';
    const breakcolor = '#F9C6CF';

    const contextProps = useContext(CreateContext);
    const [secondsLeft, setSecondsLeft] = useState(0);
    const [breakMinutes, setBreakMinutes] = useState(10);
    const [isPaused, setIsPaused] = useState(true);
    const [mode, setMode] = useState('start');

    const secondsLeftRef = useRef(secondsLeft);
    const isPausedRef = useRef(isPaused);
    const modeRef = useRef(mode);

    function tick(){
        secondsLeftRef.current--;
        setSecondsLeft(secondsLeftRef.current);
    }

    useEffect(() => {

            function changeMode(){
                const nextModeIs = modeRef.current === 'start' ? 'pause' : 'start';
                const nextSecondsIs = (nextModeIs === 'start' ? contextProps.timeMinutes : contextProps.breakMinutes) * 60;
        
                setMode(nextModeIs);
                modeRef.current = nextModeIs;
        
                setSecondsLeft(nextSecondsIs);
                secondsLeftRef.current = nextSecondsIs;
            }

            secondsLeftRef.current = contextProps.timeMinutes * 60;
            setSecondsLeft(secondsLeftRef.current);

            const interval = setInterval(() => {
                if(isPausedRef.current) {
                    return;
                }
                if(secondsLeftRef.current === 0) {
                    return changeMode()
                }
                tick();
            }, 1000);

            return () => clearInterval(interval);
    }, [contextProps]);

    const totalSeconds = mode === 'start' ? contextProps.timeMinutes * 60 : contextProps.breakMinutes * 60;
    const percentage = Math.round(secondsLeft / totalSeconds * 100);

    const minutes = Math.floor(secondsLeft / 60);
    let seconds = secondsLeft % 60;
    if(seconds < 10) seconds = '0'+seconds;

    return (
        <div className="flex h-screen flex-col items-center justify-evenly p-20">
            <div className="flex flex-col items-center">
            <CircularProgressbar value={percentage} text={minutes +`:` + seconds} strokeWidth={3} styles={buildStyles({
                textColor:mode == 'start' ? brand : breakcolor,
                pathColor:mode == 'start' ? brand : breakcolor,
                trailColor: '#F6F5F5',
            })}/>
            </div>
            
            <div className="flex items-center">
                <button className="pr-4">
                    {!isPaused ? <StopIcon className="iconStop w-16 h-16 text-time" onClick={() => { setIsPaused(true); isPausedRef.current = true;}} /> :  
                    <PlayIcon className="w-16 h-16 text-time" onClick={() => { setIsPaused(false); isPausedRef.current = false;}}/> }
                </button>

                <Disclosure>
                    <Disclosure.Button className="bg-time rounded-xl">
                            <CogIcon className="w-12 h-12 text-white"/>
                    </Disclosure.Button>
                    
                    <Transition 
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0">
                        <Disclosure.Panel className="p-2">
                            <ContextSettings/>
                        </Disclosure.Panel>
                    </Transition>
                </Disclosure>
                    </div>

        </div>
    )
}