import React, { CSSProperties, FC, useCallback, useMemo } from "react";
import { DateTime } from "luxon";
import "../../../styles/days.css";

interface Props {
  selectedDate: DateTime;
  onChange: (day: DateTime) => void;
  selectedStyle: CSSProperties;
}

const Days: FC<Props> = ({ selectedDate, onChange, selectedStyle }) => {
  const selectedDateStyle = useMemo((): CSSProperties => {
    return {
      backgroundColor: "#1f518f",
      color: "#fff",
      fontWeight: "bold",
      ...(selectedStyle && selectedStyle),
    };
  }, [selectedStyle]);

  const generateDays = useCallback((): JSX.Element[] => {
    const days: JSX.Element[] = [];
    const today = DateTime.now();
    const firstDayOfMonth = selectedDate
      .startOf("month")
      .startOf("week")
      .minus({ day: 1 });

    for (let i = 0; i < 42; i++) {
      const day = firstDayOfMonth.plus({ days: i });
      const isCurrentMonth = day.month === selectedDate.month;
      const isSelected = isCurrentMonth && day.hasSame(selectedDate, "day");

      let className = "day";
      if (day.hasSame(today, "day")) {
        className += " today";
      }

      if (!isCurrentMonth) {
        className += " gray";
      }
      if (isSelected) {
        className += " selected";
      }
      days.push(
        <div
          key={i}
          className={className}
          onClick={() => onChange(day)}
          style={isSelected ? selectedDateStyle : {}}
        >
          {day.day}
        </div>
      );

      if (isCurrentMonth && day.day === selectedDate.endOf("month").day) {
        break;
      }
    }

    return days;
  }, [onChange, selectedDate, selectedDateStyle]);

  return <div className="days">{generateDays()}</div>;
};

export default Days;
