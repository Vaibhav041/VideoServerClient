import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'video',
    initialState: {
      currentVideo: null
    },
    reducers: {
      updateVideo: (state, action) => {
        state.currentVideo = action.payload;
      },
      like: (state, action) => {
        if (!state.currentVideo.likes.includes(action.payload)) {
          state.currentVideo.likes.push(action.payload);
          state.currentVideo.dislikes.splice(
            state.currentVideo.dislikes.findIndex(
              (userId) => userId === action.payload
            ),
            1
          );
        }
      },
      dislike: (state, action) => {
        if (!state.currentVideo.dislikes.includes(action.payload)) {
          state.currentVideo.dislikes.push(action.payload);
          state.currentVideo.likes.splice(
            state.currentVideo.likes.findIndex(
              (userId) => userId === action.payload
            ),
            1
          );
        }
      },
    }
  })
  
  export const {updateVideo, like, dislike } = userSlice.actions
  export default userSlice.reducer;