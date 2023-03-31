import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
      currentUser: null,
    },
    reducers: {
      update: (state, action) => {
        state.currentUser = action.payload;
      }
    }
  })
  
  export const {update } = userSlice.actions
  export default userSlice.reducer;