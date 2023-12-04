"use client";

import { useBoardStore } from "@/store/BoardStore";
import { useEffect } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import Column from "@/components/Column";

function Board() {
  console.log("I am the board");

  const [board, getBoard, setBoard, updateDBTodo] = useBoardStore((state) => [
    state.board,
    state.getBoard,
    state.setBoard,
    state.updateDBTodo,
  ]);

  useEffect(() => {
    getBoard();
  }, [getBoard]);

  const handleOnDragEnd = (result: DropResult) => {
    const { destination, source, type, draggableId } = result;
    console.log(destination, source, type, draggableId);

    // dropped nowhere
    if (!destination) {
      return;
    }

    // drag column
    if (type === "column") {
      const columns = Array.from(board.columns);
      const [removed] = columns.splice(source.index, 1);
      columns.splice(destination.index, 0, removed);
      const rearrangedCol = new Map(columns);
      setBoard({ ...board, columns: rearrangedCol });
    }

    // drag card
    const columns = Array.from(board.columns);
    const srcIndex = columns[Number(source.droppableId)];
    const destIndex = columns[Number(destination.droppableId)];

    const srcCol: Column = {
      id: srcIndex[0],
      list: srcIndex[1].list,
    };
    const destCol: Column = {
      id: destIndex[0],
      list: destIndex[1].list,
    };

    if (!srcCol || !destCol) return;

    if (srcCol.id === destCol.id && source.index === destination.index) return;

    const newList = srcCol.list;
    const [removed] = newList.splice(source.index, 1);

    if (srcCol.id === destCol.id) {
      // same column
      newList.splice(destination.index, 0, removed);
      const newCol = {
        id: srcCol.id,
        list: newList,
      };

      const updatedColumns = new Map(board.columns);
      updatedColumns.set(srcCol.id, newCol);

      setBoard({ ...board, columns: updatedColumns });
    } else {
      // different column
      const newDestList = Array.from(destCol.list);
      newDestList.splice(destination.index, 0, removed);

      const newSrcCol = {
        id: srcCol.id,
        list: newList,
      };
      const newDestCol = {
        id: destCol.id,
        list: newDestList,
      };

      const updatedColumns = new Map(board.columns);
      updatedColumns.set(srcCol.id, newSrcCol);
      updatedColumns.set(destCol.id, newDestCol);

      updateDBTodo(removed, destCol.id);

      setBoard({ ...board, columns: updatedColumns });
    }
  };
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
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
