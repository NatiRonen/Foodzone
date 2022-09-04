import { createSlice } from "@reduxjs/toolkit";
import { deleteToken, saveTokenLocal } from "../services/localService";
import appApi from "./appApi";

export const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    logout: (state, { payload }) => {
      deleteToken();
      return null;
    },
    addNotifications: (state, { payload }) => {
      //actions recive roomId ad payload
      if (state.newMessages[payload]) {
        //if roomId exist as an element key in newMessages
        state.newMessages[payload] = state.newMessages[payload] + 1; //decrise by 1
      } else {
        state.newMessages[payload] = 1; // create element with roomId as the key and initialize to 1
      }
    },
    resetNotifications: (state, { payload }) => {
      delete state.newMessages[payload];
    },
  },

  extraReducers: (builder) => {
    //save user after signup
    builder.addMatcher(appApi.endpoints.signupUser.matchFulfilled, (state, { payload }) => {
      saveTokenLocal(payload.token);
      return payload.user;
    });
    //save user after login
    builder.addMatcher(appApi.endpoints.loginUser.matchFulfilled, (state, { payload }) => {
      saveTokenLocal(payload.token);
      return payload.user;
    });
    builder.addMatcher(
      appApi.endpoints.updateUser.matchFulfilled,
      (state, { payload }) => payload.user
    );
    builder.addMatcher(appApi.endpoints.deleteUser.matchFulfilled, (state) => null);
    builder.addMatcher(appApi.endpoints.updateUser.matchRejected, (state, { payload }) => {
      if (payload.status === 401) {
        return null;
      }
    });
  },
});

export const { addNotifications, resetNotifications, logout } = userSlice.actions;
export default userSlice.reducer;
