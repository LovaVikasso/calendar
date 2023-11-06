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

    const getOrdinalSuffix = (day: number) => {
        if (day % 100 >= 11 && day % 100 <= 13) {
            return 'th'; // Исключения: 11th, 12th, 13th
        }
        switch (day % 10) {
            case 1:
                return 'st';
            case 2:
                return 'nd';
            case 3:
                return 'rd';
            default:
                return 'th';
        }
    }

    return (
        <div>
            <p className={s.date}>{currentDate}{getOrdinalSuffix(currentDate)} </p>
             {monthNames[currentMonth]} {currentYear}
            <hr/>
            {dayOfWeek}
            <hr/>
        </div>
    );
}