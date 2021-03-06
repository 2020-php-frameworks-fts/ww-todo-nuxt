export const state = () => ({
  session: {
    login: '',
    password: ''
  },
  isLoading: false,
  error: ''
})

export const mutations = {
  SET_SESSION (state, auth) {
    state.session.login = auth.login
  },
  SET_ERROR (state, error) {
    state.error = error
  },
  SET_LOADING (state, loadingState) {
    state.isLoading = loadingState
  }
}

export const actions = {
  async register ({ commit }, auth) {
    commit('SET_LOADING', true)
    const formData = new FormData()
    formData.set('login', auth.login)
    formData.set('password', auth.password)
    const res = await this.$axios({
      method: 'post',
      url: 'http://localhost/createUser.php',
      data: formData
    })
    commit('SET_LOADING', false)
    if (res.status === 200) {
      commit('SET_ERROR', 'ACCOUNT CREATED')
      return
    }
    switch (res.status) {
      case 201:
        commit('SET_ERROR', 'EMPTY FORM')
        break
      case 202:
        commit('SET_ERROR', 'MYSQL SYNTAX ERROR')
        break
      case 203:
        commit('SET_ERROR', 'THAT ACCOUNT ALREADY EXISTS')
        break
      case 204:
        commit('SET_ERROR', 'MYSQL INSERT ERROR')
        break
      default:
        commit('SET_ERROR', 'UKNOW ERROR')
    }
  },
  async login ({ commit }, auth) {
    commit('SET_LOADING', true)
    const formData = new FormData()
    formData.set('login', auth.login)
    formData.set('password', auth.password)
    const res = await this.$axios({
      method: 'post',
      url: 'http://localhost/login.php',
      data: formData
    })
    commit('SET_LOADING', false)
    if (res.status === 200) {
      commit('SET_SESSION', {
        login: res.data,
        password: auth.password
      })
      return true
    }
    if (res.status === 202) {
      commit('SET_ERROR', 'MYSQL CONNECTION ERROR')
      return false
    }
    if (res.status === 203) {
      commit('SET_ERROR', 'WRONG LOGIN OR PASSWORD')
      return false
    }
    return false
  }
}

export const getters = {
  error: state => state.error,
  isLoading: state => state.isLoading,
  user_id: state => state.session.login
}
