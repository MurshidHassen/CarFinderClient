import axios from 'axios';
import * as interfaces from '../interfaces';
import { User } from '../redux/models/userModel';

declare var process: any;

const apiUrl = process.env.NODE_ENV === 'production' ? 'https://carfinderapp.herokuapp.com' : '';

export default {
  user: {
    getUser: (data: interfaces.SigninUserData) => axios.post(`${apiUrl}/api/user/signin`, data),
    signup: (data: interfaces.SignupUserData) => axios.post(`${apiUrl}/api/user/register`, data),
    confirmEmail: (token: string) => axios.post(`${apiUrl}/api/user/confirm`, { token }),
    submitEmail: (data: interfaces.RestorePasswordUserData) =>
      axios.post(`${apiUrl}/api/user/forgot`, data),
    changePassword: (data: interfaces.RestorePasswordUserData) =>
      axios.post(`${apiUrl}/api/user/restore`, { data }),
    changeUserData: (data: User) => axios.post(`${apiUrl}/api/user/update-user-data`, data),
    changeUserAvatar: (data: FormData) => axios.post(`${apiUrl}/api/user/update-user-image`, data),
    changeUserSettings: (data: interfaces.ChangeUserSettings) =>
      axios.post(`${apiUrl}/api/user/update-user-settings`, data),
    submitMessage: (data: interfaces.SendMessage) =>
      axios.post(`${apiUrl}/api/user/send-message`, data)
  },
  filters: {
    fetchMarks: () => axios.get(`${apiUrl}/api/filter/marks`),
    fetchBodyTypes: () => axios.get(`${apiUrl}/api/filter/bodytypes`),
    fetchModels: (markId: string) => axios.post(`${apiUrl}/api/filter/models`, { markId }),
    fetchResults: (data: interfaces.CarFilter) => axios.post(`${apiUrl}/api/posts`, data)
  },
  savedSearch: {
    fetchFilters: () => axios.get(`${apiUrl}/api/filter/saved`),
    submitSavedFilter: (data: interfaces.SavedFilter) =>
      axios.post(`${apiUrl}/api/filter/saved`, { data }),
    fetchSavedSearchResults: () => axios.get(`${apiUrl}/api/posts/saved`),
    removeAllSavedFilters: () => axios.delete(`${apiUrl}/api/filter/saved/all`),
    removeSavedFilterById: (id: string) => axios.delete(`${apiUrl}/api/filter/saved/${id}`)
  },
  liquidAds: {
    fetchLiquidAds: () => axios.get(`${apiUrl}/api/posts/most_liquid`)
  },
  liquidity: {
    getLiquidity: (data: interfaces.LiquidityFilter) =>
      axios.post(`${apiUrl}/api/posts/get-liquidity`, data)
  },
  stats: {
    fetchStats: () => axios.get(`${apiUrl}/api/stats/landing-stats`)
  },
  utils: {
    getImage: (imagePath: string, hostName: string) =>
      axios.get(`/redirect/image?url=${imagePath}&host=${hostName}`, {
        responseType: 'blob'
      })
  }
};
