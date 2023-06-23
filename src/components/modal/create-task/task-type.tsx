"use client";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useBoardStore } from "@/store/board-store";
import clsx from "clsx";

export function TaskTypeRadioGroup() {
  const [newTaskType, setNewTaskType] = useBoardStore((state) => [
    state.newTaskType,
    state.setNewTaskType,
  ]);
  const onRadioChange = (type: TypedColumn) => {
    setNewTaskType(type);
  };
  return (
    <RadioGroup defaultValue="comfortable">
      {types.map((type) => {
        let active = newTaskType === type.id;
        return (
          <div
            key={type.id}
            className={clsx(
              `flex items-center space-x-4 p-2 cursor-pointer rounded-md ${type.color} ${type.hoverColor}`,
              active && "outline outline-black/50"
            )}
            onClick={() => onRadioChange(type.id)}
          >
            <RadioGroupItem
              value={type.id}
              id={type.id}
              checked={active}
            />
            <div className="flex flex-col">
              <Label htmlFor={type.id}>{type.label}</Label>
              <span>{type.description}</span>
            </div>
          </div>
        );
      })}
    </RadioGroup>
  );
}

interface Type {
  id: TypedColumn;
  label: string;
  description: string;
  color: string;
  hoverColor?: string;
}

const types: Type[] = [
  {
    id: "todo",
    label: "Todo",
    description: "A task that needs to be done",
    color: "bg-red-500",
    hoverColor: "hover:bg-red-600",
  },
  {
    id: "inprogress",
    label: "In Progress",
    description: "A task that is in progress",
    color: "bg-yellow-500",
    hoverColor: "hover:bg-yellow-600",
  },
  {
    id: "done",
    label: "Done",
    description: "A task that is done",
    color: "bg-green-500",
    hoverColor: "hover:bg-green-600",
  },
];
