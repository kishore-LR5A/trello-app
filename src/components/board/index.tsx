"use client";
import { useBoardStore } from "@/store/board-store";
import { useEffect } from "react";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
  ResponderProvided,
} from "react-beautiful-dnd";
import Column from "./column";
import { todo } from "node:test";
function Board() {
  const [board, getBoard, setBoardState, updateTodoInDB] = useBoardStore(
    (state) => [
      state.board,
      state.getBoard,
      state.setBoardState,
      state.updateTodoInDB,
    ]
  );

  useEffect(() => {
    getBoard();
  }, [getBoard]);

  function handleDragEnd(
    result: DropResult,
    provided: ResponderProvided
  ): void {
    const { destination, source, draggableId, type } = result;
    // console.log(destination, source, type);
    if (!destination) return;
    // handle column drag
    if (type === "column") {
      const entries = Array.from(board.columns.entries());
      const [removed] = entries.splice(source.index, 1);
      entries.splice(destination.index, 0, removed);
      const rearragnagedCoulumns = new Map(entries);
      setBoardState({
        ...board,
        columns: rearragnagedCoulumns,
      });
    }
    // this step is needed as index are stored as numbers 0,1,2 etc. instead of id's in dnd
    const columns = Array.from(board.columns);
    const startColIndex = columns[Number(source.droppableId)];
    const finishColIndex = columns[Number(destination.droppableId)];
    const startCol: Column = {
      id: startColIndex[0],
      todos: startColIndex[1].todos,
    };
    const finishCol: Column = {
      id: finishColIndex[0],
      todos: finishColIndex[1].todos,
    };
    if (!startCol || !finishCol) return;
    if (source.index === destination.index && startCol == finishCol) return;

    const newTodos = startCol.todos;
    const [todoMoved] = newTodos.splice(source.index, 1);

    if (startCol.id === finishCol.id) {
      // dragging in the same column
      newTodos.splice(destination.index, 0, todoMoved);
      const newCol: Column = {
        id: startCol.id,
        todos: newTodos,
      };
      const newColumns = new Map(board.columns);
      newColumns.set(startCol.id, newCol);
      setBoardState({
        ...board,
        columns: newColumns,
      });
    } else {
      // dragging to another column
      const finishTodos = Array.from(finishCol.todos);
      finishTodos.splice(destination.index, 0, todoMoved);
      const newColumns = new Map(board.columns);
      const newStartCol: Column = {
        id: startCol.id,
        todos: newTodos,
      };
      const newFinishCol: Column = {
        id: finishCol.id,
        todos: finishTodos,
      };
      newColumns.set(startCol.id, newStartCol);
      newColumns.set(finishCol.id, newFinishCol);
      // update in db
      updateTodoInDB(todoMoved, finishCol.id);

      setBoardState({ ...board, columns: newColumns });
    }
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="boards" direction="horizontal" type="column">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto"
          >
            {Array.from(board.columns.entries()).map(([id, column], index) => (
              <Column key={id} id={id} todos={column.todos} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Board;
