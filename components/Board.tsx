import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";

function Board() {
  const onDragEnd = (result: DropResult) => {
    const { destination, source, type, draggableId } = result;

    // check if the user dragged card or column
    // check if the user has dragged card outside of board and not into a column
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="board" direction="horizontal" type="column">
        {(provided) => (
          <div
            className="grid grid-cols-1 md:grid-cols-3"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {/* render columns */}
            {/* columns: to do, in progress, done */}
            {/* each column has todo cards */}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default Board;
