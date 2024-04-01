import React, { FC, useCallback, useEffect, useState } from "react";
import { DateTime, Settings } from "luxon";
import { TimeFormat } from "../../util";
import TimeComponent from "./TimeComponent";
import { TimePickerProps } from "../../../types";
import PickerBox from "../PickerBox/PickerBox";
export interface Time {
  hh: string;
  mm: string;
  ss: string;
  a: string;
  zone?: string;
}

interface Props extends TimePickerProps {
  init?: boolean;
}
const TimePicker: FC<Props> = ({
  value,
  onChange,
  format,
  show,
  mainContainerClassName,
  mainContainerStyles,
  selectedStyle,
  outputZone,
  init,
}) => {
  const [time, setTime] = useState<Time>({
    hh: "01",
    mm: "00",
    ss: "00",
    a: "AM",
    zone: "",
  });
  const [scroll, setScroll] = useState(0);

  const handleInitialTime = useCallback(() => {
    const currentTime = DateTime.now().setLocale("en-US");
    const localZone = Settings.defaultZone.name;

    let formattedTime: DateTime<true> | DateTime<false> = currentTime;

    if (value && value.trim() !== "") {
      // Get time according to zone
      const inputTime = DateTime.fromFormat(`${value}`, format || TimeFormat, {
        locale: "en-US",
      });

      // Convert To Time current zone
      formattedTime = inputTime.setZone(outputZone || localZone);
    }

    const outputFormateTime = formattedTime.toFormat(format || TimeFormat);
    const timeObj = {
      hh: formattedTime.toFormat("hh"),
      mm: formattedTime.toFormat("mm"),
      ss: formattedTime.toFormat("ss"),
      a: formattedTime.toFormat("a"),
      zone: outputZone || formattedTime.toFormat("z"),
    };

    setTime(timeObj);
    // Show the short form of the zone
    if (value && value.trim() !== "") {
      onChange?.(outputFormateTime);
    }

    // Scrolling when set initial time.
    setScroll((prev) => prev + 1);
  }, [format, onChange, value]);

  useEffect(() => {
    handleInitialTime();
  }, [show, init]);

  const handleTime = useCallback(
    (key: keyof Time, value: string) => {
      const prevClone = { ...time, [key]: value };
      const { mm, hh, ss, zone, a } = prevClone;
      const hours = DateTime.fromFormat(`${hh} ${a}`, "hh a").hour;
      const formattedTime = DateTime.fromObject(
        {
          minute: parseInt(mm),
          second: parseInt(ss),
          hour: hours,
        },
        { zone }
      )
        .setZone(zone)
        .toFormat(format || TimeFormat);
      onChange?.(formattedTime);
      setTime(prevClone);
    },
    [format, setTime, onChange, time]
  );

  return (
    <PickerBox
      mainContainerClassName={mainContainerClassName}
      mainContainerStyles={mainContainerStyles}
    >
      <TimeComponent
        value={time}
        onChange={handleTime}
        scroll={scroll}
        selectedTimeStyle={selectedStyle}
      />
    </PickerBox>
  );
};

export default TimePicker;
