import React, {
  CSSProperties,
  FC,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import { Time } from "./TimePicker";
import "../../../styles/time-components.css";

interface Props {
  value: Time;
  scroll: number;
  onChange: (key: keyof Time, value: string) => void;
  selectedTimeStyle?: CSSProperties;
}

const Headers: Record<keyof Time, string> = {
  hh: "HH",
  mm: "MM",
  ss: "SS",
  a: "A/P",
  zone: "Zone",
};
const TimeComponent: FC<Props> = ({
  value,
  onChange,
  scroll,
  selectedTimeStyle,
}) => {
  useEffect(() => {
    handleScroll();
  }, [scroll]);

  // Initial render scroll till selected hh:mm:ss
  const handleScroll = useCallback(() => {
    const elements: { [key: string]: HTMLElement | null } = {};
    Object.keys(value).forEach((key) => {
      elements[key] = document.getElementById(
        `${key}${value[key as keyof Time]}`
      );
    });

    Object.entries(elements).forEach(([key, childElement]) => {
      const parent = document.getElementById(key);
      if (childElement && parent) {
        parent.scrollTo({
          top: childElement.offsetTop - 65,
        });
      }
    });
  }, [value]);

  // Generate two-digit padded strings for hours, minutes, and seconds
  const { hoursArray, minuteOrSecondArray, meridiemArray } = useMemo(
    () => ({
      hoursArray: Array.from({ length: 12 }, (_, index) =>
        (index + 1).toString().padStart(2, "0")
      ),
      minuteOrSecondArray: Array.from({ length: 60 }, (_, index) =>
        index.toString().padStart(2, "0")
      ),
      meridiemArray: ["AM", "PM"],
    }),
    []
  );

  const timeComponents: { dataArray: string[]; key: keyof Time }[] = [
    { dataArray: hoursArray, key: "hh" },
    { dataArray: minuteOrSecondArray, key: "mm" },
    { dataArray: minuteOrSecondArray, key: "ss" },
    { dataArray: meridiemArray, key: "a" },
  ];

  const selectedStyle = useMemo(
    (): CSSProperties => ({
      backgroundColor: "#1f518f",
      color: "#ffffff",
      fontWeight: 500,
      ...(selectedTimeStyle && selectedTimeStyle),
    }),
    [selectedTimeStyle]
  );

  return (
    <>
      <div className={`main-container`}>
        {timeComponents.map(({ dataArray, key }) => (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              margin: "0px 3px",
            }}
            key={Headers[key]}
          >
            <div
              className="header"
              style={{ width: "100%", justifyContent: "center" }}
            >
              <span>{Headers[key]}</span>
            </div>
            <div className="wrapper" key={key} id={key}>
              {dataArray.map((item) => {
                const isSelected = item === value[key];
                return (
                  <p
                    id={`${key}${item}`}
                    key={`${key}${item}`}
                    onClick={() => onChange(key, item)}
                    className={`digitBox`}
                    style={isSelected ? selectedStyle : {}}
                  >
                    {item}
                  </p>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TimeComponent;
