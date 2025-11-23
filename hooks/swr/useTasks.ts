import { Task } from "@/app/models/dto/Task";
import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";

export default function useTasks() {
  const { data, ...args } = useSWR("/api/tasks", fetcher);

  const tasks: Task[] = data;

  return {
    tasks,
    ...args,
  };
}
