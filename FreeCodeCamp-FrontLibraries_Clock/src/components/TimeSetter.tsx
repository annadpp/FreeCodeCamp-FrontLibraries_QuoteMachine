import React from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

interface TimerSetterProps {
  time: number;
  setTime: (time: number) => void;
  min: number;
  max: number;
  interval: number;
  type: "break" | "session";
}

const TimeSetter: React.FC<TimerSetterProps> = ({
  time,
  setTime,
  min,
  max,
  interval,
  type,
}) => {
  const lengthInMinutes = time / interval; // Calcular la longitud en minutos

  return (
    <div>
      <button
        onClick={() =>
          lengthInMinutes > min / interval ? setTime(time - interval) : null
        }
        id={`${type}-decrement`}
      >
        <FaArrowDown />
      </button>
      <span id={`${type}-length`}>{lengthInMinutes}</span>
      <button
        onClick={() =>
          lengthInMinutes < max / interval ? setTime(time + interval) : null
        }
        id={`${type}-increment`}
      >
        <FaArrowUp />
      </button>
    </div>
  );
};

export default TimeSetter;
