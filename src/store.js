import { configureStore } from '@reduxjs/toolkit'
import jobSlice from './features/job/jobSlice'
import userSlice from './features/userSlice'
import allJobsSlice from './features/allJobs/allJobSlice'

export const store = configureStore({
  reducer: {
    user: userSlice,
    job: jobSlice,
    allJobs: allJobsSlice,
  },
})
