import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { getUserFromLocalStorage } from '../../utils/localStorage'
import { createJobThunk, deleteJobThunk, editJobThunk } from './jobThunk'
const initialState = {
  isLoading: false,
  position: '',
  company: '',
  jobLocation: '',
  jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
  jobType: 'full-time',
  statusOptions: ['interview', 'declined', 'pending'],
  status: 'pending',
  isEditing: false,
  editJobId: '',
}

export const createdJob = createAsyncThunk('job/createdJob', createJobThunk)

export const deleteJob = createAsyncThunk('job/deleteJob', deleteJobThunk)

export const editJob = createAsyncThunk('job/editJob', editJobThunk)

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value
    },
    clearInput: () => {
      return {
        ...initialState,
        jobLocation: getUserFromLocalStorage()?.location || '',
      }
    },
    setEditJob: (state, { payload }) => {
      return { ...state, isEditing: true, ...payload }
    },
  },
  extraReducers: {
    [createdJob.pending]: (state) => {
      state.isLoading = true
    },
    [createdJob.fulfilled]: (state) => {
      state.isLoading = false
      toast.success('Tạo Job thành công...')
    },
    [createdJob.rejected]: (state, { payload }) => {
      state.isLoading = false
      toast.error(payload)
    },
    [deleteJob.fulfilled]: (state, { payload }) => {
      toast.success('Xoá Job thành công!')
    },
    [deleteJob.rejected]: (state, { payload }) => {
      toast.error(payload)
    },
    [editJob.pending]: (state) => {
      state.isLoading = true
    },
    [editJob.fulfilled]: (state) => {
      state.isLoading = false
      toast.success('Sửa Job thành công...')
    },
    [editJob.rejected]: (state, { payload }) => {
      state.isLoading = false
      toast.error(payload)
    },
  },
})

export const { handleChange, clearInput, setEditJob } = jobSlice.actions

export default jobSlice.reducer
