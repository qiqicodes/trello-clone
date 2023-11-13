import { create } from "zustand";
import getTodosColumn from "@/utils/getTodosColumn";

interface BoardState {
  board: Board;
  getBoard: () => void;
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
}));
