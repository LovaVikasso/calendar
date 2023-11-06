import {FC, useMemo} from "react";
import {monthNames, shortDaysOfWeek} from "../common";
import {ChevronLeft, ChevronRight, DoubleChevronLeft, DoubleChevronRight} from "../../assets/icons";
import s from './date-picker.module.scss'

type DatePickerProps = {
    value: Date
    onChange: (value: Date) => void
}

export const DatePicker: FC<DatePickerProps> = ({value, onChange}) => {
    const [year, month, date] = useMemo(() => {
        const year = value.getFullYear()
        const month = value.getMonth()
        const day = value.getDate()
        return [year, month, day]
    }, [value])


    const previousMonth = () => {
        let newMonth = month - 1;
        let newYear = year;
        if (newMonth < 0) {
            // Переключаемся на предыдший год, если месяц стал меньше нуля
            newYear--;
            newMonth = 11; // 11 соответствует декабрю
        }
        const newSelectedDate = new Date(newYear, newMonth, date);
        onChange(newSelectedDate);
    }
    const nextMonth = () => {
        let newMonth = month + 1;
        let newYear = year;
        if (newMonth > 11) {
            // Переключаемся на следующий год, если месяц стал больше 11
            newYear++;
            newMonth = 0; // 0 соответствует январю
        }
        const newSelectedDate = new Date(newYear, newMonth, date);
        onChange(newSelectedDate);
    }
    const previousYear = () => {
        const newYear = year - 1;
        const newSelectedDate = new Date(newYear, month, date);
        onChange(newSelectedDate);
    }
    const nextYear = () => {
        const newYear = year + 1;
        const newSelectedDate = new Date(newYear, month, date);
        onChange(newSelectedDate);
    }

    // Определите первый и последний дни месяца
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    //month + 1, date: 0 - следующий месяц и один день назад

    // Определите, сколько дней в предыдущем месяце, чтобы заполнить начало календаря
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    // Определите день недели первого дня текущего месяца (0 - воскресенье, 1 - понедельник, и так далее)
    const startDayOfWeek = firstDay.getDay();

    // Создайте массив чисел для ячеек календаря
    const calendarData = [];
    let day = 1;

    for (let i = 0; i < 6; i++) {
        const week = [];
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < startDayOfWeek) {
                // Заполняем начало календаря числами предыдущего месяца
                week.push(daysInPrevMonth - startDayOfWeek + j + 1);
            } else if (day > lastDay.getDate()) {
                // Заполняем конец календаря числами следующего месяца
                week.push(day - lastDay.getDate());
                day++
            } else {
                // Заполняем текущий месяц
                week.push(day);
                day++;
            }
        }
        calendarData.push(week);
    }

    return (
        <div>
            <div className={s.navigation}>
                <div>
                    <button onClick={previousYear}><DoubleChevronLeft/></button>
                    <button onClick={previousMonth}><ChevronLeft/></button>
                </div>
                <div>
                    <button onClick={nextMonth}><ChevronRight/></button>
                    <button onClick={nextYear}><DoubleChevronRight/></button>
                </div>
            </div>
            <div>
                <h3 className={s.current}>{monthNames[month]} {year}</h3>
            </div>

            <table className={s.month}>
                <thead>
                <tr >
                    {shortDaysOfWeek.map((day, index) => {
                        return <th className={s.cell} key={index}>{day}</th>
                    })}
                </tr>
                </thead>
                <tbody>
                {calendarData.map((week, weekIndex) => (
                    <tr key={weekIndex}>
                        {week.map((day, dayIndex) => (
                            <td className={s.cell} key={dayIndex}>{day}</td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
            <hr/>
        </div>
    )
}