// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TimerPage from "./pages/timer-page.tsx";
import DataTablePage from "./pages/data-table-page.tsx";
import TodoListPage from "./pages/todo-list-page.tsx";
import TimeTrackerPage from "./pages/time-tracker.tsx";
import TimeTrackerTestPage from "./pages/time-tracker-test-page.tsx";
import { ThemeProvider } from "./contexts/theme-context.tsx";
import WebsocketPage from "./pages/websocket.tsx";

const router = createBrowserRouter([
  {
    path: "/timer",
    element: <TimerPage />,
  },
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/table",
    element: <DataTablePage />,
  },
  {
    path: "/todolist",
    element: <TodoListPage />,
  },
  {
    path: "/timetracker",
    element: <TimeTrackerPage />,
  },
  {
    path: "/timetracker-test",
    element: <TimeTrackerTestPage />,
  },
  {
    path: "/websocket",
    element: <WebsocketPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <ThemeProvider>
    <RouterProvider router={router} />
  </ThemeProvider>
  // </StrictMode>,
);
