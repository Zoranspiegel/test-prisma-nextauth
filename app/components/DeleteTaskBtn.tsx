"use client";

import useTasks from "@/hooks/swr/useTasks";
import { useEffect, useRef, useState } from "react";
import { FaTrashCan } from "react-icons/fa6";

export default function DeleteTaskBtn({ id }: { id: string }) {
  const [panelVisibility, setPanelVisibility] = useState(false);
  const { mutate } = useTasks();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function clickOutside(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setPanelVisibility(false);
      }
    }

    addEventListener("mouseup", clickOutside);

    return () => {
      removeEventListener("mouseup", clickOutside);
    };
  }, []);

  async function deleteTask() {
    const res = await fetch(`/api/tasks/${id}`, { method: "DELETE" });

    if (res.ok) {
      setPanelVisibility(false);
      mutate();
    }
  }

  return (
    <div className="relative h-3 w-3 flex">
      <button className="h-full w-full flex cursor-pointer" onClick={() => setPanelVisibility(true)}>
        <FaTrashCan />
      </button>
      {panelVisibility && (
        <div
          className="absolute right-0 top-0 flex flex-col gap-2 border-4 border-double bg-background p-2 cursor-default z-10"
          ref={panelRef}
        >
          <p className="whitespace-nowrap text-alert">Delete task?</p>
          <div className="flex justify-center gap-2">
            <button
              className="w-10 text-center border cursor-pointer transition hover:bg-foreground hover:text-background"
              onClick={deleteTask}
            >
              Yes
            </button>
            <button
              className="w-10 text-center border cursor-pointer transition hover:bg-foreground hover:text-background"
              onClick={() => setPanelVisibility(false)}
            >
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
