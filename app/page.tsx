import CreateTask from "./components/CreateTask";
import Tasks from "./components/Tasks";

export default function Home() {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Next Tasks</h1>
      <Tasks />
      <CreateTask />
    </div>
  );
}
