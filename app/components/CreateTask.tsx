"use client";

import { useForm, type SubmitHandler } from "react-hook-form";
import { createTaskDto, type CreateTaskDto } from "../models/dto/Task";
import { zodResolver } from "@hookform/resolvers/zod";

export default function CreateTask() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateTaskDto>({ resolver: zodResolver(createTaskDto) });

  const submit: SubmitHandler<CreateTaskDto> = async (data) => {
    const res = await fetch("/api/tasks", { method: "POST", body: JSON.stringify(data) });
    if (res.ok) {
      const parsedRes = await res.json();
      console.log(parsedRes);
    }
    reset();
  };

  return (
    <form className="w-sm flex flex-col gap-4 border-4 border-double p-4" onSubmit={handleSubmit(submit)}>
      <div className="flex flex-col gap-1">
        <label>Title</label>
        <input type="text" className="border outline-none px-4 py-1" {...register("title")} />
        {errors.title && <span className="text-error text-xs">{errors.title.message}</span>}
      </div>
      <div className="flex flex-col gap-1">
        <label>Description</label>
        <input type="text" className="border outline-none px-4 py-1" {...register("description")} />
        {errors.description && <span className="text-error text-xs">{errors.description.message}</span>}
      </div>
      <div className="flex flex-col gap-1">
        <button
          disabled={isSubmitting}
          className="border py-1 transition hover:bg-foreground hover:text-background disabled:bg-background disabled:border-focus disabled:text-focus"
        >
          {isSubmitting ? "Loading..." : "Create"}
        </button>
        {errors.root && <span className="text-error text-xs">{errors.root.message}</span>}
      </div>
    </form>
  );
}
