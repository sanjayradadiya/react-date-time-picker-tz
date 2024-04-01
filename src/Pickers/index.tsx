import React, { FC, useCallback, useRef, useState } from "react";
import { ReactDateTimePickerProps } from "../types";
import Wrapper from "./Wrapper";
import TimePicker from "./components/Time/TimePicker";
import DatePicker from "./components/Date/DatePicker";
import DateTimePicker from "./components/DateTime/DateTimePicker";
import { Clock, Calendar } from "../icons";

const ReactDateTimePickers: FC<ReactDateTimePickerProps> = ({
  value,
  onChange,
  format,
  type,
  onHide,
  onShow,
  selectedStyle,
  mainContainerClassName,
  mainContainerStyles,
}) => {
  const [show, setShow] = useState(false);
  const parentRef = useRef<HTMLSpanElement>(null);

  const onShowPicker = useCallback(() => {
    onShow?.();
    setShow(true);
  }, [onShow]);

  const onHidePicker = useCallback(() => {
    onHide?.();
    setShow(false);
  }, [onHide]);

  const PickerComponents = {
    date: DatePicker,
    time: TimePicker,
    dateTime: DateTimePicker,
  }[type];

  const Icon = {
    date: Calendar,
    time: Clock,
    dateTime: Calendar,
  }[type];

  return (
    <>
      <span ref={parentRef} onClick={onShowPicker}>
        <Icon />
      </span>
      <Wrapper show={show} setShow={onHidePicker} parentRef={parentRef}>
        {show && (
          <PickerComponents
            value={value}
            onChange={onChange}
            format={format}
            show={show}
            selectedStyle={selectedStyle}
            mainContainerClassName={mainContainerClassName}
            mainContainerStyles={mainContainerStyles}
          />
        )}
      </Wrapper> 
    </>
  );
};

export default ReactDateTimePickers;
