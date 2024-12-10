import * as React from "react";
import Button from "../components/ui/button";
import { formatTime } from "../utils";
import { ThemeContext } from "../contexts/theme-context";

const TimeTrackerTestPage = () => {
  const { isDarkMode, toogleMode } = React.useContext(ThemeContext);
  const [tasks, setTasks] = React.useState<any[]>([]);
  const [activeTask, setActiveTask] = React.useState<Record<any, any>>({
    name: "",
    timeSpent: 0,
    startTime: null,
    isRunning: false,
  });

  //   name: "",
  //   timeSpent: 0,
  //   startTime: null,
  //   isRunning: false,

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (activeTask.isRunning) {
        setActiveTask((prev) => {
          return {
            ...prev,
            timeSpent: prev.timeSpent + 1,
          };
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [activeTask.isRunning]);

  const startHandler = () => {
    if (activeTask.name.trim() !== "") {
      setActiveTask((prev) => ({
        ...prev,
        isRunning: true,
        startTime: prev.startTime || new Date(),
      }));
    }
  };

  const pauseHandler = () => {
    setActiveTask((prev) => ({
      ...prev,
      isRunning: false,
    }));
  };

  const saveDataHandler = () => {
    const newData = {
      id: Date.now(),
      name: activeTask.name,
      startTime: activeTask.startTime!,
      timeSpent: activeTask.timeSpent,
      endTime: new Date(),
    };
    setTasks((prev) => [...prev, newData]);

    setActiveTask({
      name: "",
      timeSpent: 0,
      startTime: null,
      isRunning: false,
    });
  };

  const deleteDataHandler = (taskId: number) => {
    setTasks((prev) => prev.filter((item) => item.id !== taskId));
  };

  //   const editDataHandler = () => {
  //     const index = tasks.findIndex((task) => task.id === editTask.id);
  //     if (index !== -1) {
  //       const updatedData = [...tasks];
  //       updatedData[index] = { name: activeTask.name };
  //       setTasks(updatedData);
  //     }
  //   };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-slate-100 p-3">
        <h1 className="font-semibold text-2xl">Time Tracker</h1>
      </div>
      <div className="bg-blue-100 p-3">
        <h3 className={`font-semibold text-xl text-blue-400 dark:text-red-500`}>
          Current Task
        </h3>
        <div className="flex mt-4">
          <input
            type="text"
            name="activity"
            id="activity"
            placeholder="What do we do today?"
            value={activeTask.name}
            className="flex-1 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 border"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setActiveTask((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </div>
        <div className="flex items-center justify-between mt-8">
          <span className="font-semibold text-2xl font-mono">
            {formatTime(activeTask.timeSpent)}
          </span>
          <div className="flex items-center gap-3">
            {!activeTask.isRunning ? (
              <Button
                name="Start"
                bgColor="bg-green-500"
                onClick={startHandler}
                disabled={!activeTask.name}
              />
            ) : (
              <Button name="Stop" onClick={pauseHandler} />
            )}
            <Button
              name="Save"
              bgColor="bg-red-500"
              onClick={saveDataHandler}
              disabled={activeTask.timeSpent === 0}
            />
          </div>
        </div>
      </div>
      <div className="bg-green-100 p-3 space-y-2">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div
              key={task.id}
              className="bg-white space-y-1 p-3 rounded-md flex justify-between"
            >
              <div>
                <h3 className="font-semibold">{task.name}</h3>
                <p className="text-sm text-gray-500 font-light">
                  {formatTime(task.timeSpent)}
                </p>
                <p className="text-sm text-gray-500">
                  {task.startTime.toLocaleTimeString()} -{" "}
                  {task.endTime.toLocaleTimeString()}
                </p>
              </div>
              <Button
                name="Delete"
                bgColor="bg-red-500"
                onClick={() => deleteDataHandler(task.id)}
              />
            </div>
          ))
        ) : (
          <div className="w-full">
            <span className="block text-center">No Data</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TimeTrackerTestPage;
