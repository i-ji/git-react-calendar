import { useState } from "react";
import "./calendar.css";

type Dates = {
  date: number;
  isToday: boolean;
  isDisabled: boolean;
};

const Calendar = () => {
  const thisYear = new Date().getFullYear();
  const thisMonth = new Date().getMonth();

  const [year, setYear] = useState(thisYear);
  const [month, setMonth] = useState(thisMonth);
  const weeks = [] as Dates[][];

  // 先月分のカレンダー
  const getCalendarHead = () => {
    const dates = [] as Dates[];
    const d = new Date(year, month, 0).getDate();
    const n = new Date(year, month, 1).getDay();

    for (let i = 0; i < n; i++) {
      dates.unshift({ date: d - i, isToday: false, isDisabled: true });
    }
    return dates;
  };

  // 今月分のカレンダー
  const getCalendarBody = () => {
    const dates = [] as Dates[];
    const lastDate = new Date(year, month + 1, 0).getDate();

    for (let i = 1; i <= lastDate; i++) {
      dates.push({ date: i, isToday: false, isDisabled: false });
    }

    if (year === thisYear && month === thisMonth) {
      dates[new Date().getDate() - 1].isToday = true;
    }
    return dates;
  };

  // 来月分のカレンダー
  const getCalendarTail = () => {
    const dates = [] as Dates[];
    const n = new Date(year, month + 1, 0).getDay();

    for (let i = 1; i < 7 - n; i++) {
      dates.push({ date: i, isToday: false, isDisabled: true });
    }
    return dates;
  };

  // カレンダー統合
  const createCalendar = () => {
    const dates = [
      ...getCalendarHead(),
      ...getCalendarBody(),
      ...getCalendarTail(),
    ];

    const weekCount = dates.length / 7;

    for (let i = 0; i < weekCount; i++) {
      weeks.push(dates.splice(0, 7));
    }
  };

  createCalendar();

  // 前の月に戻る
  const backLastMonth = () => {
    setMonth(month - 1);

    if (month < 1) {
      setMonth(11);
      setYear(year - 1);
    }
    createCalendar();
  };

  // 次の月に進む
  const goToNextMonth = () => {
    setMonth(month + 1);

    if (month > 10) {
      setMonth(0);
      setYear(year + 1);
    }
    createCalendar();
  };

  // 今日に戻る
  const backToday = () => {
    setYear(thisYear);
    setMonth(thisMonth);
    createCalendar();
  };

  return (
    <table className="border-2 border-gray-200">
      <thead className="bg-gray-200">
        <tr>
          <th className="cursor-pointer select-none" onClick={backLastMonth}>
            &laquo;
          </th>
          <th colSpan={5}>
            {year}/{String(month + 1).padStart(2, "0")}
          </th>
          <th className="cursor-pointer select-none" onClick={goToNextMonth}>
            &raquo;
          </th>
        </tr>
        <tr>
          <th>Sun</th>
          <th>Mon</th>
          <th>Tue</th>
          <th>Wen</th>
          <th>Thu</th>
          <th>Fri</th>
          <th>Sat</th>
        </tr>
      </thead>
      <tbody>
        {weeks.map((week, index) => {
          return (
            <tr key={index}>
              {week.map((date, index) => {
                return (
                  <td
                    key={index}
                    className={`first:text-red-500 last:text-blue-500 ${
                      date.isDisabled ? "opacity-30" : ""
                    } ${date.isToday ? "font-bold" : ""}`}
                  >
                    {date.date}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
      <tfoot className="bg-gray-200 font-bold cursor-pointer select-none">
        <tr>
          <td colSpan={7} onClick={backToday}>
            Today
          </td>
        </tr>
      </tfoot>
    </table>
  );
};
export default Calendar;
