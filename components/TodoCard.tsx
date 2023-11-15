import { XCircleIcon } from "@heroicons/react/24/solid";
import { Draggable } from "react-beautiful-dnd";

function TodoCard({ todo, index }: cardProps) {
  const handleDelete = () => {
    // delete from db
    return;
  };

  return (
    <Draggable key={todo.$id} draggableId={todo.$id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`p-2 rounded-xl ${
            snapshot.isDragging ? "bg-purple-500" : "bg-white"
          }`}
        >
          <div className="flex justify-between items-center p-2">
            <p>{todo.title}</p>
            <button className="text-red-400" onClick={handleDelete}>
              <XCircleIcon className="h-7 w-7" />
            </button>
          </div>

          {todo.image && <img src={todo.image} alt={todo.title} />}
        </div>
      )}
    </Draggable>
  );
}
export default TodoCard;

type cardProps = { todo: Todo; index: number };
