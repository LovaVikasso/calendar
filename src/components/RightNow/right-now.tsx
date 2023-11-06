import {useMemo} from "react";
import {daysOfWeek, monthNames} from "../common";
import s from './right-now.module.scss'

export const RightNow = () => {
    const [currentYear, currentMonth, currentDate, dayOfWeek] = useMemo(() => {
        const today = new Date
        const year = today.getFullYear()
        const month = today.getMonth()
        const day = today.getDate()
        const dayOfWeek = daysOfWeek[today.getDay()]
        return [year, month, day, dayOfWeek]
    }, [])
    return (
        <div>
            <p className={s.date}>{currentDate}</p>
             {monthNames[currentMonth]} {currentYear}
            <hr/>
            {dayOfWeek}
            <hr/>
        </div>
    );
}