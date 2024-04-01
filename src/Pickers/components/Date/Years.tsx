import React, { CSSProperties, useCallback, useMemo, useState } from "react";
import "../../../styles/years.css";
import { DateTime } from "luxon";
import YearHeader from "./YearHeader";

interface Props {
  selectedDate: DateTime;
  onChange: (year: number) => void;
}
const Years: React.FC<Props> = ({ selectedDate, onChange }) => {
  const [initialYear, setInitialYear] = useState(selectedDate.year);

  const selectedDateStyle = useMemo((): CSSProperties => {
    return {
      backgroundColor: "#1f518f",
      color: "#fff",
      fontWeight: "bold",
    };
  }, []);

  const handleYear = useCallback((offset: number) => {
    setInitialYear((prev) => prev + offset);
  }, []);

  // Render list of years
  const renderYearsList = useCallback(() => {
    const years = Array.from({ length: 6 }, (_, index) => initialYear + index);
    return years.map((year) => {
      let className = "year";
      const isSelected = year === selectedDate.year;
      if (isSelected) {
        className += " selected";
      }
      return (
        <button
          className={className}
          key={year}
          style={isSelected ? selectedDateStyle : {}}
          onClick={() => onChange(year)}
        >
          {year}
        </button>
      );
    });
  }, [initialYear, onChange, selectedDateStyle]);

  return (
    <>
      <YearHeader initialYear={initialYear} handleYear={handleYear} />
      <div className="years">{renderYearsList()}</div>
    </>
  );
};

export default Years;
