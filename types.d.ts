interface Board {
  columns: Map<TypedColumn, Column>;
}

type TypedColumn = "todo" | "inprogress" | "done";

interface Column {
  id: TypedColumn;
  list: Todo[];
}

interface Todo extends Models.Document {
  $id: string;
  $createdAt: string;
  title: string;
  status: TypedColumn;
  image?: string;
}

interface Image {
  bucketId: string;
  fileId: string;
}
