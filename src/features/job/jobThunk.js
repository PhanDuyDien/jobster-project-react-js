import {
  showLoading,
  hideLoading,
  getAllJobs,
  clearAllJobs,
} from '../allJobs/allJobSlice'
import customFetch, { checkForUnauthorizedResponse } from '../../utils/axios'
import { clearInput } from './jobSlice'
export const createJobThunk = async (jobs, thunkAPI) => {
  try {
    const response = await customFetch.post('/jobs', jobs)
    thunkAPI.dispatch(clearInput())
    thunkAPI.dispatch(clearAllJobs())
    return response.data
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI)
  }
}

export const deleteJobThunk = async (jobId, thunkAPI) => {
  thunkAPI.dispatch(showLoading())
  try {
    const resp = await customFetch.delete(`/jobs/${jobId}`)
    thunkAPI.dispatch(getAllJobs())
    return resp.data.msg
  } catch (error) {
    thunkAPI.dispatch(hideLoading())
    return checkForUnauthorizedResponse(error, thunkAPI)
  }
}

export const editJobThunk = async ({ jobId, job }, thunkAPI) => {
  try {
    const resp = await customFetch.patch(`/jobs/${jobId}`, job)
    thunkAPI.dispatch(clearInput())
    return resp.data
  } catch (error) {
    return checkForUnauthorizedResponse(error, thunkAPI)
  }
}
