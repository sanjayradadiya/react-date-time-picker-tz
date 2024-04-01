import { DateTime } from "luxon";
import React, { FC } from "react";
import "../../../styles/header.css";
import { CalendarState } from "../../util";
import DownArrow from "../../../icons/Down-Arrow";
import UpArrow from "../../../icons/UpArrow";

interface Props {
  selectedDate: DateTime;
  onChange: (day: DateTime) => void;
  handleYearChange: (offset: number) => void;
  handleMonthChange: (offset: number) => void;
  toggleState: () => void;
  state: CalendarState;
}
const Header: FC<Props> = ({
  selectedDate,
  onChange,
  handleMonthChange,
  handleYearChange,
  toggleState,
  state,
}) => {
  return (
    <div className="header">
      <p onClick={() => handleYearChange(-1)} className="pointer">
        &lt;&lt;
      </p>
      <p onClick={() => handleMonthChange(-1)} className="pointer">
        &lt;
      </p>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onClick={toggleState}
      >
        {selectedDate.setLocale("en-US").toLocaleString({ month: "short", year: "numeric" })}
        {state === CalendarState.DAY ? <DownArrow /> : <UpArrow />}
      </div>
      <span onClick={() => onChange(DateTime.now())} className="today pointer">
        Today
      </span>
      <p onClick={() => handleMonthChange(1)} className="pointer">
        &gt;
      </p>
      <p onClick={() => handleYearChange(1)} className="pointer">
        &gt;&gt;
      </p>
    </div>
  );
};

export default Header;
