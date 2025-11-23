import cn from "@/utils/cn";
import type { Task } from "../models/dto/TaskDto";
import DeleteTaskBtn from "./DeleteTaskBtn";
import useTasks from "@/hooks/swr/useTasks";

export default function Task({ task }: { task: Task }) {
  const { mutate } = useTasks();

  async function updateTask() {
    const res = await fetch(`/api/tasks/${task.id}`, {
      method: "PATCH",
      body: JSON.stringify({ completed: !task.completed }),
    });

    if (res.ok) {
      mutate();
    }
  }

  return (
    <div className="flex transition select-none cursor-pointer hover:bg-focus">
      <div className={cn("w-full flex flex-col", task.completed && "line-through text-disabled")} onClick={updateTask}>
        <h1 className="text-xl font-bold">{task.title}</h1>
        <p className="text-xs opacity-60">
          {new Date(task.updatedAt) > new Date(task.createdAt)
            ? `Modified ${new Date(task.updatedAt).toLocaleString("en-en", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}`
            : `Created ${new Date(task.createdAt).toLocaleString("en-en", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}`}
        </p>
        <p>{task.description}</p>
      </div>
      <DeleteTaskBtn id={task.id} />
    </div>
  );
}
