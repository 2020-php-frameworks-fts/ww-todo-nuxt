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
    state.session.login = { ...auth }
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
  login () {}
}

export const getters = {
  error: state => state.error,
  isLoading: state => state.isLoading
}
