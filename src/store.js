import { configureStore } from '@reduxjs/toolkit'
import classroomsReducer from './redux/classroomsSlice'
import gradesReducer from './redux/gradeSlice'
import userReducer from './redux/userSlice'
export const store = configureStore(
  {
    reducer: {
      classrooms: classroomsReducer,
      user: userReducer,
      grades: gradesReducer,
    },
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
