interface Board {
  columns: Map<TypedColumn, Column>;
}

type TypedColumn = "todo" | "inprogress" | "done";

interface Column {
  id: TypedColumn;
  lists: Todo[];
}

interface Todo {
  id: string;
  createdTimestamp: string;
  title: string;
  description: string;
  status: TypedColumn;
  image?: string;
}

interface Image {
  bucketId: string;
  fileId: string;
}
