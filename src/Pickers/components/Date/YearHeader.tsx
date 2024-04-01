import React, { FC } from "react";

export interface YearHeaderProps {
  initialYear: number;
  handleYear: (offset: number) => void;
}
const YearHeader: FC<YearHeaderProps> = ({ initialYear, handleYear }) => {
  return (
    <div className="header">
      <p onClick={() => handleYear(-100)} className="pointer">
        &lt;&lt;
      </p>
      <p onClick={() => handleYear(-6)} className="pointer">
        &lt;
      </p>
      {initialYear}-{initialYear + 5}
      {/* <span>{selectedDate.toLocaleString({ year: "numeric" })}</span> */}
      <p onClick={() => handleYear(6)} className="pointer">
        &gt;
      </p>
      <p onClick={() => handleYear(100)} className="pointer">
        &gt;&gt;
      </p>
    </div>
  );
};

export default YearHeader;
