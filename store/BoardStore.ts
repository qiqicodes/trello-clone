import { create } from "zustand";

interface BoardState {
  board: Board;
  getBoard: () => void;
}

const useBoardStore = create((BoardState) => ({
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
  },
}));
