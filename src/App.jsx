import { useState } from 'react'
import { PomodoroTimer } from './components/PomodoroTimer/PomodoroTImer'
import '../src/global.css'
import { ContextSettings } from './components/contexts/ContextSettings'
import CreateContext from './components/contexts/CreateContext';

export function App() {

  const [timeMinutes, setTimeMinutes] = useState(50);
  const [breakMinutes, setBreakMinutes] = useState(10);
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div>
    <CreateContext.Provider value={{
      showSettings,
      setShowSettings,
      timeMinutes,
      setTimeMinutes,
      breakMinutes,
      setBreakMinutes,
    }}>
{showSettings ? <ContextSettings/> : <PomodoroTimer/>}   
    </CreateContext.Provider>

    </div>
  )
}
