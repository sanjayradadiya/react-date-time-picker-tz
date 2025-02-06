import React from "react";
import { DateTime, WeekdayNumbers } from "luxon"; // Import DateTime from Luxon
import "../../../styles/weeks.css";

const Weeks = React.memo(() => {
  const weekdays = [];

  for (let i = 0; i < 7; i++) {
    const weekday = DateTime.local()
      .set({ weekday: i as WeekdayNumbers })
      .toFormat("EEE");
    weekdays.push(weekday);
  }

  return (
    <div className="weekdays">
      {weekdays.map((day, index) => (
        <div key={index} className="weekday">
          {day}
        </div>
      ))}
    </div>
  );
});

export default Weeks;
