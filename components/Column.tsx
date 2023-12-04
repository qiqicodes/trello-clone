import { Draggable, Droppable } from "react-beautiful-dnd";
import TodoCard from "@/components/TodoCard";
import { PlusCircleIcon } from "@heroicons/react/20/solid";

function Column({ id, list, index }: ColumnProps) {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <div
          className={` p-2 rounded-2xl shadow-sm ${
            snapshot.isDragging ? "bg-orange-500" : "bg-white/0"
          }`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Droppable droppableId={index.toString()} type="card">
            {(provided, snapshot) => (
              <div
                className={`p-2 rounded-2xl shadow-sm ${
                  snapshot.isDraggingOver ? "bg-blue-500" : "bg-white/50"
                }`}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <h2 className="flex justify-between font-bold text-lg p-2 pb-4">
                  {columnIdToText[id]}
                  <span className="rounded-full bg-orange-400/50 px-3 py-1 text-sm font-normal">
                    {list.length}
                  </span>
                </h2>
                <div className="flex flex-col space-y-2">
                  {list.map((todo, index) => (
                    <TodoCard key={todo.$id} todo={todo} index={index} />
                  ))}
                </div>
                {provided.placeholder}
                <div className="flex items-end justify-end p-2">
                  <button>
                    <PlusCircleIcon className="h-10 w-10 text-blue-400" />
                  </button>
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
