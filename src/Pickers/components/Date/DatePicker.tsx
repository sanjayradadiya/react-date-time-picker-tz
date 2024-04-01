import React, { FC, useCallback, useEffect, useState } from "react";
import { DateTime } from "luxon";
import { DatePickerProps } from "../../../types";
import PickerBox from "../PickerBox/PickerBox";
import Calendar from "./Calender";

const DatePicker: FC<DatePickerProps> = ({
  onChange,
  value,
  format,
  show,
  selectedStyle,
}) => {
  const [date, setDate] = useState<string | null>();

  useEffect(() => {
    let initDate = handleFormat();
    handleSetDate(initDate);
  }, [show]);

  const handleSetDate = useCallback((dateValue: any) => {
    const formattedDate = (
      format && Boolean(format.trim())
        ? DateTime.fromFormat(dateValue, format)
        : DateTime.fromISO(dateValue)
    )
      .startOf("day")
      .toISO();

    setDate(formattedDate);
  }, []);

  const handleOnChange = useCallback(
    (data: string) => {
      if (data) {
        const parsedDate = DateTime.fromISO(
          new Date(data.toString()).toISOString()
        ).startOf("day");
        const formattedDate =
          format && Boolean(format.trim())
            ? parsedDate.toFormat(format)
            : parsedDate.toISODate();
        handleSetDate(formattedDate);
        onChange?.(formattedDate!);
      }
    },
    [format, handleSetDate, onChange]
  );

  const handleFormat = useCallback(() => {
    if (format && Boolean(format.trim())) {
      return DateTime.now().toFormat(format);
    } else {
      return DateTime.now().toISODate();
    }
  }, [format, value]);
  return (
    <>
      <PickerBox>
        <Calendar
          onChange={handleOnChange}
          value={date}
          selectedStyle={selectedStyle}
        />
      </PickerBox>
    </>
  );
};

export default DatePicker;
