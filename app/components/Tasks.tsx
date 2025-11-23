"use client";

import useTasks from "@/hooks/swr/useTasks";
import Task from "./Task";

export default function Tasks() {
  const { tasks, isLoading, error } = useTasks();

  if (isLoading) return <div>LOADING...</div>;

  if (error) return <div>ERROR</div>;

  return (
    <div className="w-sm flex flex-col gap-4 border-4 border-double p-4">
      {tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
}
