import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiService from "../../app/apiService"

const initialState = {
  todos: [],
  filter: "SHOW_ALL",
  status: "idle"
};



export const addTodo = createAsyncThunk('counter/addTodo',
  async (text) => {
    const todo = { text, completed: false }
    const res = await apiService.post("/todos", todo)
    return res.data
  }
);
export const getTodos = createAsyncThunk('counter/getTodo',
  async () => {
    const res = await apiService.get("/todos")
    return res.data
  }
);


export const todoSlice = createSlice({
  name: "todo",
  initialState,

  reducers: {
    toggleTodo: (state, action) => {
      state.todos = state.todos.map((todo) => {
        if (todo.id === action.payload) {

          return { ...todo, completed: !todo.completed }
        }
        return todo;
      })
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    }
  },
  extraReducers: (builders) => {
    builders.addCase(addTodo.pending, (state) => {
      state.status = "loading"
    }).addCase(addTodo.fulfilled, (state, action) => {
      state.status = "idle"
      state.todos.push(action.payload)
    }).addCase(addTodo.rejected, (state, action) => {
      state.status = "fail"
      state.error = action.error.message
    })

    builders.addCase(getTodos.pending, (state) => {
      state.status = "loading"
    }).addCase(getTodos.fulfilled, (state, action) => {
      state.status = "idle"
      state.todos = action.payload
    }).addCase(getTodos.rejected, (state, action) => {
      state.status = "fail"
      state.error = action.error.message
    })
  }
}
)

export const { toggleTodo, setFilter } = todoSlice.actions;

export default todoSlice.reducer;