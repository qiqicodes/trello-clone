"use client";

import { useBoardStore } from "@/store/BoardStore";
import { useEffect } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import Column from "@/components/Column";

function Board() {
  console.log("I am the board");

  const [board, getBoard] = useBoardStore((state) => [
    state.board,
    state.getBoard,
  ]);

  useEffect(() => {
    getBoard();
  }, [getBoard]);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, type, draggableId } = result;

    // check if the user dragged card or column
    // check if the user has dragged card outside of board and not into a column
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <h1>I am beautiful dnd board</h1>
      <Droppable droppableId="board" direction="horizontal" type="column">
        {(provided) => (
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-5 mx-auto"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {/* render columns */}
            {/* columns: to do, in progress, done */}
            {/* each column has todo cards */}
            {Array.from(board.columns.entries()).map(([id, column], index) => (
              <Column
                key={id}
                id={id}
                list={column.list}
                index={index}
              ></Column>
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Board;
