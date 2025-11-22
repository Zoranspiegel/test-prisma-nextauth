import { z } from "zod";

export const createTaskDto = z.object({
  title: z.string().min(2, "Title must have at least 2 characters"),
  description: z.string().min(2, "Description must have at least 2 characters"),
});

export type CreateTaskDto = z.infer<typeof createTaskDto>;
