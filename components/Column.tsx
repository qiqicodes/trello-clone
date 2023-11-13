import { Draggable, Droppable } from "react-beautiful-dnd";
import TodoCard from "@/components/TodoCard";

function Column({ id, list, index }: ColumnProps) {
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
                    <TodoCard key={todo.$id} todo={todo} index={index} />
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

type ColumnProps = {
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
