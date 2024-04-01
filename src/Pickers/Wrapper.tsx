import React, { FC, useEffect, useRef, useState } from "react";
import useThrottledResize from "./hooks/useThrottledResize";
import ReactDOM from "react-dom";
import "../styles/wrapper.css";
interface Props {
  children: any;
  setShow: (c: boolean) => void;
  show: boolean;
  parentRef: React.RefObject<HTMLElement>;
}

const Wrapper: FC<Props> = ({ children, show, setShow, parentRef }) => {
  const pickerRef = useRef<HTMLDivElement>(null);
  const portalContainerRef = useRef<HTMLDivElement | null>(null);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const throttledHandleResize = useRef(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  }).current;

  useThrottledResize(throttledHandleResize, 200);

  useEffect(() => {
    if (!portalContainerRef.current) {
      portalContainerRef.current = document.createElement("div");
      document.body.appendChild(portalContainerRef.current);
    }

    return () => {
      if (portalContainerRef.current) {
        document.body.removeChild(portalContainerRef.current);
        portalContainerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (pickerRef.current && parentRef.current && show) {
      const picker = pickerRef.current;
      const buttonIcon = parentRef.current;

      const positionValues = picker.getBoundingClientRect();
      const buttonPosition = buttonIcon.getBoundingClientRect();
      const { innerHeight, innerWidth } = window;

      let top = 0;
      const shouldAtTop =
        buttonPosition &&
        innerHeight - buttonPosition.bottom < picker.offsetHeight;

      if (shouldAtTop) {
        const atTop =
          buttonPosition.top - picker.offsetHeight + buttonPosition.height;

        if (atTop >= picker.offsetHeight) {
          top = atTop;
        } else {
          top = buttonPosition.height + buttonPosition.top;
        }
      } else {
        top = buttonPosition.height + buttonPosition.top;
      }
      const style: React.CSSProperties = {
        position: "absolute",
        zIndex: 9999,
        top: `${top}px`,
      };
      const outSideWidthToWindow =
        innerWidth - (buttonPosition.left + picker.offsetWidth);
      const shouldMoveToMoreLeft =
        innerWidth - buttonPosition.left < picker.offsetWidth;
      style.left = shouldMoveToMoreLeft
        ? `${buttonPosition.left + outSideWidthToWindow - 10}px`
        : `${
            buttonPosition.x - positionValues.width / 2 + buttonPosition.width
          }px`;

      Object.assign(picker.style, style);
    }
  }, [pickerRef, show, parentRef, windowSize]);

  if (!portalContainerRef.current) return null;

  return ReactDOM.createPortal(
    <>
      {show && (
        <div
          style={{
            position: "fixed",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            zIndex: 2000,
          }}
          onClick={() => setShow(false)}
        ></div>
      )}
      <div
        ref={pickerRef}
        className="mainContainer"
        style={{ display: show ? "flex" : "none" }}
      >
        {children}
      </div>
    </>,
    portalContainerRef.current
  );
};

export default Wrapper;
