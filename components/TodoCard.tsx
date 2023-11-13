import { Draggable } from "react-beautiful-dnd";

function TodoCard({ todo, index }: cardProps) {
  return (
    <Draggable key={todo.$id} draggableId={todo.$id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`p-2 rounded-2xl ${
            snapshot.isDragging ? "bg-purple-500" : "bg-white/50"
          }`}
        >
          {todo.title}
        </div>
      )}
    </Draggable>
  );
}
export default TodoCard;

type cardProps = { todo: Todo; index: number };
