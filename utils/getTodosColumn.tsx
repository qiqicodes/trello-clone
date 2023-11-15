import { database } from "@/appwrite";

async function getTodosColumn() {
  // read and query data from collection
  try {
    let data = await database.listDocuments(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!
    );
    // transform array to a map
    const todos = data.documents;
    const columns = todos.reduce((acc, todo) => {
      if (!acc.get(todo.status)) {
        acc.set(todo.status, {
          id: todo.status,
          list: [],
        });
      }

      acc.get(todo.status)!.list.push({
        $id: todo.$id,
        $createdAt: todo.$createdAt,
        title: todo.title,
        status: todo.status,
        ...(todo.image && { image: todo.image }),
      });

      return acc;
    }, new Map<TypedColumn, Column>());

    // if columns are empty, fill with empty list
    const columnTypes: TypedColumn[] = ["todo", "inprogress", "done"];
    for (let column of columnTypes) {
      if (!columns.get(column)) {
        columns.set(column, {
          id: column,
          list: [],
        });
      }
    }

    const board: Board = {
      columns: columns,
    };
    console.log(board);
    return board;
  } catch (error) {
    console.error(error);
  }
}

export default getTodosColumn;
