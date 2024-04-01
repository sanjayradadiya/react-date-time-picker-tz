import ReactDateTimePicker from "./Pickers";
import DatePicker from "./Pickers/components/Date/DatePicker";
import TimePickerComponent from "./Pickers/components/Time/TimePicker";
import DateTimePicker from "./Pickers/components/DateTime/DateTimePicker";
import {
  PickerType,
  PickerProps,
  ReactDateTimePickerProps,
  TimePickerProps,
} from "./types";
import { FC } from "react";

export { ReactDateTimePicker, DatePicker, DateTimePicker };
export type { PickerType, PickerProps, ReactDateTimePickerProps };

export const TimePicker: FC<TimePickerProps> = TimePickerComponent;
