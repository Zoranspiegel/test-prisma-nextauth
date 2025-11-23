import type { Task } from "../models/dto/Task";

export default function Task({ task }: { task: Task }) {
  return (
    <div className="flex flex-col">
      <h1 className="text-xl font-bold">{task.title}</h1>
      <p>{task.description}</p>
    </div>
  );
}
