import { createSlice } from "@reduxjs/toolkit";
import { assignments } from "../../Database";

const initialState = {
  assignments: assignments,
  selectedAssignment: {},
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (state, action) => {
      state.assignments = [...state.assignments, { ...action.payload, _id: new Date().getTime().toString() }];
    },
    deleteAssignment: (state, action) => {
      state.assignments = state.assignments.filter(assignment => assignment._id !== action.payload);
    },
    updateAssignment: (state, action) => {
      state.assignments = state.assignments.map(assignment => assignment._id === action.payload._id ? action.payload : assignment);
    },
    selectAssignment: (state, action) => {
      state.selectedAssignment = action.payload;
    },
  },
});

export const { addAssignment, deleteAssignment, updateAssignment, selectAssignment } = assignmentsSlice.actions;
export default assignmentsSlice.reducer;
