import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
// css
import "../css/timer.css";

function Timer(props) {
  let time = 10;

  const formatRemainingTime = (_time) => {
    const hours = Math.floor(_time / 3600);
    const minutes = Math.floor((_time % 3600) / 60);
    const seconds = _time % 60;

    return `${hours}:${minutes}:${seconds}`;
  };

  const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      return <div className="text_timer">Delivery Arrived 😋</div>;
    }

    return (
      <div className="timer">
        <div className="text_timer">Remaining time</div>
        <div className="value">{formatRemainingTime(remainingTime)}</div>
      </div>
    );
  };

  return (
    <div className="timer_wrapper my-4">
      <CountdownCircleTimer isPlaying duration={time} colors={["#5ea4f3"]}>
        {renderTime}
      </CountdownCircleTimer>
    </div>
  );
}

export default Timer;
