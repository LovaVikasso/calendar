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
        <div className={s.container}>
            <div className={s.dateContainer}>
                <span className={s.date}>{currentDate} </span><span className={s.suffix}>{getOrdinalSuffix(currentDate)}</span>
            </div>
            <div className={s.bottomContainer}>
            <span className={s.month}>{monthNames[currentMonth]}</span>
                <div className={s.rightContainer}>
                    <span className={s.year}>{currentYear}</span>
                    <span className={s.week}>{dayOfWeek}</span>
                </div>
            </div>
        </div>
    );
}