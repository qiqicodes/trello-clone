import { Draggable, Droppable } from "react-beautiful-dnd";

function Column({ id, list, index }: dragProps) {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`p-2 rounded-2xl ${
            snapshot.isDragging ? "bg-orange-500" : "bg-white/50"
          }`}
        >
          <Droppable droppableId={index.toString()} type="card">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`p-2 rounded-2xl ${
                  snapshot.isDraggingOver ? "bg-blue-500" : "bg-white/50"
                }`}
              >
                <h2 className="flex justify-between font-bold text-lg p-2">
                  {columnIdToText[id]}
                  <span className="rounded-full bg-blue-400 p-2 text-sm font-normal">
                    {list.length}
                  </span>
                </h2>
                <div className="flex flex-col space-y-2">
                  {list.map((todo, index) => (
                    <Draggable
                      key={todo.$id}
                      draggableId={todo.$id}
                      index={index}
                    >
                      {(provided, _snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Droppable droppableId={index.toString()} type="card">
                            {(provided, snapshot) => (
                              <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className={`p-2 rounded-2xl ${
                                  snapshot.isDraggingOver
                                    ? "bg-purple-500"
                                    : "bg-white/50"
                                }`}
                              >
                                {todo.title}
                              </div>
                            )}
                          </Droppable>
                        </div>
                      )}
                    </Draggable>
                  ))}
                </div>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}

type dragProps = {
  id: TypedColumn;
  list: Todo[];
  index: number;
};

const columnIdToText: { [key in TypedColumn]: string } = {
  todo: "To Do",
  inprogress: "In Progress",
  done: "Done",
};

export default Column;
