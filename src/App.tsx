import s from './App.module.css'
import {useState} from "react";
import {RightNow, DatePicker} from "./components";

function App() {
const [date, setDate] = useState(() => new Date)
  return (
    <div className={s.container}>
      <RightNow />
      <DatePicker value={date} onChange={setDate} />
    </div>
  )
}

export default App
