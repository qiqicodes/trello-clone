"use client";

import { useBoardStore } from "@/store/BoardStore";
import { useEffect } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import Column from "@/components/Column";

function Board() {
  console.log("I am the board");

  const [board, getBoard, setBoard] = useBoardStore((state) => [
    state.board,
    state.getBoard,
    state.setBoard,
  ]);

  useEffect(() => {
    getBoard();
  }, [getBoard]);

  const handleOnDragEnd = (result: DropResult) => {
    const { destination, source, type, draggableId } = result;
    console.log(destination, source, type, draggableId);

    // check if the user dragged card or column

    // dropped nowhere
    if (!destination) {
      return;
    }

    // column drag
    if (type === "column") {
      const entries = Array.from(board.columns.entries());
      const [removed] = entries.splice(source.index, 1);
      entries.splice(destination.index, 0, removed);
      const rearrangedCol = new Map(entries);
      setBoard({ ...board, columns: rearrangedCol });
      console.log(entries);
    }

    // card drag
    if (type === "card") {
    }
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <h1>I am beautiful dnd board</h1>
      <Droppable droppableId="board" direction="horizontal" type="column">
        {(provided) => (
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-7xl mx-auto"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {Array.from(board.columns.entries()).map(([id, column], index) => (
              <Column key={id} id={id} list={column.list} index={index} />
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Board;
