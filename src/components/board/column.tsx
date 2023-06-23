import React, { useEffect, useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { PlusCircle } from "lucide-react";
import TodoCard from "./todo-card";
import { useBoardStore } from "@/store/board-store";
import { CreateTask } from "../modal/create-task";

type Props = {
  id: TypedColumn;
  todos: Todo[];
  index: number;
};

const idToColumnText: {
  [key in TypedColumn]: string;
} = {
  todo: "Todo",
  inprogress: "In Progress",
  done: "Done",
};

function Column({ id, todos, index }: Props) {
  const [searchString] = useBoardStore((state) => [state.searchString]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);

  useEffect(() => {
    if (!searchString) {
      setFilteredTodos(todos);
      return;
    }
    setFilteredTodos([]);
    todos.forEach((todo) => {
      if (todo.title.toLowerCase().includes(searchString.toLowerCase())) {
        setFilteredTodos((prev) => [...prev, todo]);
      }
    });
  }, [searchString, todos]);

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {/* {redner droppable} */}
          <Droppable droppableId={index.toString()} type="card">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`p-2 rounded-2xl shadow-sm ${
                  snapshot.isDraggingOver ? "bg-green-200" : "bg-white/50"
                }`}
              >
                <h2 className="flex justify-between font-bold text-xl p-2">
                  {idToColumnText[id]}{" "}
                  <Avatar className="text-sm h-6 w-6">
                    <AvatarFallback>{filteredTodos.length}</AvatarFallback>
                  </Avatar>
                </h2>
                <div className="space-y-2">
                  {filteredTodos.map((todo, index) => {
                    return (
                      <Draggable
                        key={todo.$id}
                        draggableId={todo.$id}
                        index={index}
                      >
                        {(provided) => (
                          <TodoCard
                            id={id}
                            index={index}
                            todo={todo}
                            innerRef={provided.innerRef}
                            draggableProps={provided.draggableProps}
                            dragHandleProps={provided.dragHandleProps}
                          />
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                  <div className="flex justify-end items-end">
                    {/* <button className="text-green-500 hover:text-green-500">
                      <PlusCircle className="h-8 w-8" />
                    </button> */}
                    <CreateTask />
                  </div>
                </div>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}

export default Column;
