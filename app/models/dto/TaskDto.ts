import { z } from "zod";

export const createTaskDto = z.object({
  title: z.string().min(2, "Title must have at least 2 characters"),
  description: z.string().min(2, "Description must have at least 2 characters"),
});

export const updateTaskDto = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  completed: z.boolean().optional(),
});

export const taskDto = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  completed: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Task = z.infer<typeof taskDto>;

export type CreateTaskDto = z.infer<typeof createTaskDto>;

export type UpdateTaskDto = z.infer<typeof updateTaskDto>;
