import { createStore } from 'vuex'

export interface IUser {
  displayName?: string,
  email?: string,
  uid?: string,
  photoURL?: string
  refreshToken?: string
}
const user:IUser = {}
export default createStore({
  state: {
    user
  },
  mutations: {
    SET_USER: (state, data:IUser) => {
      state.user = data
    }
  },
  actions: {
  },
  modules: {
  }
})
