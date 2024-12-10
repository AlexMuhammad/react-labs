import * as React from "react";

function TimerPage() {
  const [timer, setTimer] = React.useState<Date>(new Date());

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer(new Date());
    }, 1000);
    console.log(intervalId);

    return () => console.log("clear timer");
  }, []);

  return (
    <>
      <h1>test</h1>
      <h1>{timer.toLocaleTimeString()}</h1>
    </>
  );
}

export default TimerPage;
