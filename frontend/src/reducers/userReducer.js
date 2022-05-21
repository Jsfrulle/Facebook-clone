import { createSlice } from "@reduxjs/toolkit";

const userReducer = createSlice({
  name: "userReducer",
  initialState: {
    first_name: "",
    last_name: "",
    password: "",
    username: "",
    email: "",
    token:"",
    gender: "",
    bYear: "",
    bMonth: "",
    bDay: "",
    mode: true,
  
  },

  reducers: {
    setFirstName: (store, action) => {
      store.first_name = action.payload;
    },
    setLastName: (store, action) => {
      store.last_name = action.payload;
    },
    setPassword: (store, action) => {
      store.password = action.payload;
    },
    setUsername: (store, action) => {
      store.username = action.payload;
    },
    setEmail: (store, action) => {
      store.email = action.payload;
    },
    setToken: (store, action) => {
      store.token = action.payload;
    },
    setGender: (store, action) => {
      store.gender = action.payload;
    },
    setBYear: (store, action) => {
      store.bYear = action.payload;
    },
    setBMonth: (store, action) => {
      store.bMonth = action.payload;
    },
    setBDay: (store, action) => {
      store.bDay = action.payload;
    },
    setMode: (store, action) => {
      store.mode = action.payload;
    },
   
  }
});

export default userReducer;
