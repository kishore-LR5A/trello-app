"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useBoardStore } from "@/store/board-store";
import { ImageIcon, PlusCircle } from "lucide-react";
import { TaskTypeRadioGroup } from "./task-type";
import { useRef, useState } from "react";
import Image from "next/image";

export function CreateTask() {
  const [newTaskTitle, setNewTaskTitle, image, setImage, addTask, newTaskType] =
    useBoardStore((state) => [
      state.newTaskTitle,
      state.setNewTaskTitle,
      state.image,
      state.setImage,
      state.addTask,
      state.newTaskType,
    ]);
  const imagePickerRef = useRef<HTMLInputElement>(null);
  const dialogCloseRef = useRef<HTMLButtonElement>(null);
  const handleAddTask = () => {
    addTask(newTaskTitle, newTaskType, image);
    setNewTaskTitle("");
    setImage(null);
    dialogCloseRef.current?.click();
  };

  return (
    <Dialog>
      <DialogTrigger asChild className="cursor-pointer">
        <PlusCircle className="h-8 w-8 text-green-500 hover:text-green-500" />
      </DialogTrigger>
      <DialogClose ref={dialogCloseRef} />
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Task</DialogTitle>
          <DialogDescription>
            Create a new task for your board.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            {/* <Label htmlFor="name" className="text-right">
              Title
            </Label> */}
            <Input
              id="name"
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              className="col-span-4"
              placeholder="Enter a title for this task"
            />
          </div>
        </div>
        <TaskTypeRadioGroup />
        <div>
          {image && (
            <Image
              src={URL.createObjectURL(image)}
              alt="preview"
              className="w-full h-40 object-cover rounded-md"
              height={200}
              width={200}
            />
          )}
          <Button
            variant="outline"
            className="mt-1 p-4 text-md hover:bg-white/90 w-full flex justify-center items-center space-x-2"
            onClick={() => imagePickerRef.current?.click()}
          >
            <ImageIcon className="w-5 h-5" />
            <span>{image ? "Change Image" : "Upload Image"}</span>
          </Button>
          <input
            type="file"
            ref={imagePickerRef}
            hidden
            onChange={(e) => {
              // check if picked file is an image
              if (
                e.target.files &&
                e.target.files.length === 1 &&
                e.target.files[0].type.startsWith("image/")
              ) {
                // set the image to the state
                setImage(e.target.files[0]);
              } else {
                return;
              }
            }}
          />
        </div>
        <DialogFooter>
          <Button disabled={!newTaskTitle} onClick={handleAddTask}>
            Add Task
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
