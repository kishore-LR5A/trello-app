import { getURl } from "@/lib/utils";
import { useBoardStore } from "@/store/board-store";
import { XCircle } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  DraggableProvidedDragHandleProps,
  DraggableProvidedDraggableProps,
} from "react-beautiful-dnd";

type Props = {
  id: TypedColumn;
  index: number;
  todo: Todo;
  innerRef: (element: HTMLElement | null) => void;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
};

function TodoCard({
  id,
  index,
  todo,
  innerRef,
  draggableProps,
  dragHandleProps,
}: Props) {
  const [deleteTask] = useBoardStore((state) => [state.deleteTask]);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  useEffect(() => {
    if (todo.image) {
      const fetchImageUrl = async () => {
        const url = await getURl(todo.image!);
        if (url) {
          setImageUrl(url.toString());
        }
      };
      fetchImageUrl();
    }
  }, [todo]);

  return (
    <div
      className="bg-white rounded-md drop-shadow-md space-y-2 p-2 flex flex-col"
      {...draggableProps}
      {...dragHandleProps}
      ref={innerRef}
    >
      <div className="flex justify-between items-center p-3">
        <p>{todo.title}</p>
        <button onClick={() => deleteTask(index, todo, id)}>
          <XCircle className="h-6 w-6 text-red-500 hover:text-red-600 ml-5" />
        </button>
      </div>
      {imageUrl && (
        <div className="h-full w-full rounded-b-md">
          <Image
            src={imageUrl}
            alt="task image"
            height={200}
            width={400}
            className="w-full object-contain rounded-b-md"
          />
        </div>
      )}
    </div>
  );
}

export default TodoCard;
