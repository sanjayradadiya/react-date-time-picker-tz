import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { DateTime } from "luxon";
import "../../../styles/calendar.css";
import Years from "./Years";
import { CalendarState } from "../../util";
import Days from "./Days";
import Weeks from "./Weeks";
import Header from "./Header";

interface Props {
  value: string | undefined | null;
  onChange: (value: string) => void;
  selectedStyle?: CSSProperties;
}

const Calendar: React.FC<Props> = ({ value, onChange, selectedStyle }) => {
  const [state, setState] = useState<CalendarState>(CalendarState.DAY);
  const [selectedDate, setSelectedDate] = useState<DateTime>(DateTime.now());

  useEffect(() => {
    if (Boolean(value)) {
      setSelectedDate(DateTime.fromISO(value!));
    } else {
      setSelectedDate(DateTime.now());
    }
  }, [value]);

  const handleDateClick = useCallback(
    (day: DateTime) => {
      setSelectedDate(day);
      onChange(day.toISODate()!);
    },
    [onChange]
  );

  const selectedDateStyle = useMemo((): CSSProperties => {
    return {
      backgroundColor: "#1f518f",
      color: "#fff",
      fontWeight: "bold",
      ...(selectedStyle && selectedStyle),
    };
  }, [selectedStyle]);

  const handleMonthChange = (offset: number) => {
    setSelectedDate((prev) => {
      const value = prev.plus({ months: offset });
      handleDateClick(value);
      return value;
    });
  };
  const handleYearChange = (offset: number) => {
    setSelectedDate((prev) => {
      const value = prev.plus({ years: offset });
      handleDateClick(value);
      return value;
    });
  };

  const onChangeYear = useCallback(
    (year: number) => {
      setSelectedDate(selectedDate.set({ year }));
      setState(CalendarState.DAY);
    },
    [selectedDate]
  );
  const toggleState = useCallback(() => {
    setState((prev) => {
      return prev === CalendarState.DAY
        ? CalendarState.YEAR
        : CalendarState.DAY;
    });
  }, []);

  return (
    <div className="calendar">
      {state === CalendarState.DAY && (
        <>
          <Header
            selectedDate={selectedDate}
            state={state}
            onChange={handleDateClick}
            handleMonthChange={handleMonthChange}
            handleYearChange={handleYearChange}
            toggleState={toggleState}
          />
          <Weeks />
          <Days
            selectedDate={selectedDate}
            onChange={handleDateClick}
            selectedStyle={selectedDateStyle}
          />
        </>
      )}

      {state === CalendarState.YEAR && (
        <Years selectedDate={selectedDate} onChange={onChangeYear} />
      )}
    </div>
  );
};

export default Calendar;
