import { create } from "zustand";
import getTodosColumn from "@/utils/getTodosColumn";
import { database } from "@/appwrite";

interface BoardState {
  board: Board;
  getBoard: () => void;
  setBoard: (board: Board) => void;
  updateDBTodo: (todo: Todo, column: TypedColumn) => void;
}

export const useBoardStore = create<BoardState>()((set) => ({
  board: {
    columns: new Map<TypedColumn, Column>(),
  },
  getBoard: async () => {
    // fetch all data and group by column
    // data looks like {
    //   todos: [],
    //   inprogress:[],
    //   done:[]
    // }

    const board = await getTodosColumn();
    set({ board });
  },

  setBoard: (board) => set({ board }),

  updateDBTodo: async (todo, column) => {
    await database.updateDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TODOS_COLLECTION_ID!,
      todo.$id,
      { title: todo.title, status: column }
    );
  },

  // deleteDBTodo: async (todo) => {}

  // createDBTodo: async (todo) => {s}
}));
