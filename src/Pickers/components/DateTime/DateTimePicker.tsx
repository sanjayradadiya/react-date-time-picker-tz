import React, {
  FC,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import TimePicker from "../Time/TimePicker";
import { DateTime, Settings } from "luxon";
import DatePicker from "../Date/DatePicker";
import { DateFormat, DateTimeFormat, TimeFormat } from "../../util";
import { PickerProps } from "../../../types";

interface state {
  date: string;
  time: string;
}
const DateTimePicker: FC<PickerProps> = ({ value, onChange, format, show }) => {
  const [dateTime, setDateTime] = useState<state>({ date: "", time: "" });
  const [init, setInit] = useState(false);
  useEffect(() => {
    const zone = Settings.defaultZone.name;
    let datePart = "";
    let timePart = "";
    if (value && value.trim() !== "") {
      const convertedDateTime = DateTime.fromFormat(
        value,
        format || DateTimeFormat,
        {
          locale: "en-US",
        }
      ).setZone(zone);
      datePart = convertedDateTime.toFormat(DateFormat);
      timePart = convertedDateTime.toFormat(TimeFormat);

      const outputFormateDateTime = convertedDateTime.toFormat(
        format || DateTimeFormat
      );
      onChange?.(outputFormateDateTime);
      setInit(true);
    }
    setDateTime({ date: datePart, time: timePart });
  }, [show]);

  const handleChange = useCallback(
    (data: string, key: keyof state) => {
      let outputFormateDateTime = "";
      const prevDateTime = { ...dateTime, [key]: data };
      if (prevDateTime.date === "") {
        prevDateTime.date = DateTime.now().toFormat(DateFormat);
      }
      if (prevDateTime.time === "") {
        prevDateTime.time = DateTime.now().toFormat(TimeFormat);
      }
      outputFormateDateTime = DateTime.fromFormat(
        `${prevDateTime.date} ${prevDateTime.time}`,
        DateTimeFormat
      ).toFormat(format || DateTimeFormat);
      onChange?.(outputFormateDateTime);
      setDateTime(prevDateTime);
    },
    [onChange, format, dateTime]
  );

  return (
    <div style={{ display: "flex" }}>
      <DatePicker
        value={dateTime.date}
        onChange={(date) => handleChange(date, "date")}
        show={show}
      />
      <TimePicker
        value={dateTime.time}
        onChange={(time) => handleChange(time, "time")}
        show={show}
        init={init}
      />
    </div>
  );
};

export default DateTimePicker;
