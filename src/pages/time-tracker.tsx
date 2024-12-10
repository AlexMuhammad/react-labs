import * as React from "react";

interface Task {
  id: number;
  name: string;
  timeSpent: number;
  startTime: Date;
  endTime: Date;
}

interface ActiveTask {
  name: string;
  timeSpent: number;
  isRunning: boolean;
  startTime: Date | null;
}

const TimeTrackerPage = () => {
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [activeTask, setActiveTask] = React.useState<ActiveTask>({
    name: "",
    isRunning: false,
    startTime: null,
    timeSpent: 0,
  });

  React.useEffect(
    function () {
      const interval = setInterval(() => {
        if (activeTask.isRunning) {
          setActiveTask((prev) => ({
            ...prev,
            timeSpent: prev.timeSpent + 1,
          }));
        }
      }, 1000);

      return function () {
        clearInterval(interval);
      };
    },
    [activeTask.isRunning]
  );

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const startHandler = () => {
    if (activeTask.name.trim()) {
      setActiveTask((prev) => ({
        ...prev,
        isRunning: true,
        startTime: prev.startTime || new Date(),
      }));
    }
  };

  const pauseHandler = () => {
    setActiveTask((prev) => {
      return {
        ...prev,
        isRunning: false,
      };
    });
  };

  const stopHandler = () => {
    if (activeTask.timeSpent > 0) {
      const newTask: Task = {
        id: Date.now(),
        name: activeTask.name,
        timeSpent: activeTask.timeSpent,
        startTime: activeTask.startTime!,
        endTime: new Date(),
      };
      setTasks((prev) => [...prev, newTask]);
      setActiveTask({
        name: "",
        isRunning: false,
        startTime: null,
        timeSpent: 0,
      });
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <div>
        <h1 className="bg-red-400 font-semibold text-2xl">Time Tracker</h1>
      </div>
      <div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3>Current Task</h3>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              className="flex-1 p-2 rounded-md focus:outline-none border focus:ring-2 ring-blue-100 mt-3"
              placeholder="Lu mau ngapain?"
              value={activeTask.name}
              onChange={(e) =>
                setActiveTask((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-mono">
              {formatTime(activeTask.timeSpent)}
            </span>
            <div className="flex gap-2">
              {!activeTask.isRunning ? (
                <button
                  className="bg-green-400 py-1 px-3 rounded-md text-white"
                  onClick={startHandler}
                  disabled={!activeTask.name}
                >
                  Play
                </button>
              ) : (
                <button
                  className="bg-yellow-400 py-1 px-3 rounded-md text-white"
                  onClick={pauseHandler}
                >
                  Stop
                </button>
              )}
              <button
                className="bg-red-400 py-1 px-3 rounded-md text-white"
                onClick={stopHandler}
                disabled={activeTask.timeSpent === 0}
              >
                Done
              </button>
            </div>
          </div>
        </div>
        <div className="mt-3 space-y-3">
          <h3 className="font-semibold text-xl">Completed Tasks</h3>
          {/* Card completed */}

          {tasks.length > 0 ? (
            tasks.map((task: Task) => (
              <div key={task.id} className="bg-gray-200 p-3 rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium">{task.name}</h3>
                  <p className="text-sm text-gray-600">
                    {formatTime(task.timeSpent)}
                  </p>
                  <p className="text-xs text-gray-500">
                    {task.startTime.toLocaleTimeString()} -{" "}
                    {task.endTime.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-gray-200 p-3 rounded-lg">
              <h3 className="text-center font-semibold text-gray-500/90">
                No Data
              </h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimeTrackerPage;
