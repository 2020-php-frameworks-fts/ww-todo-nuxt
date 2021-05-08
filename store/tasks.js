import Vue from 'vue'
export const state = () => ({
  todos: {
    done: [],
    undone: []
  },
  error: '',
  isLoading: false
})

export const mutations = {
  SET_ERROR (state, error) {
    state.error = error
  },
  SET_TODO (state, todos) {
    const done = []
    const undone = []
    todos.forEach((todo) => {
      if (todo.state === '0') {
        undone.push(todo.name)
      } else {
        done.push(todo.name)
      }
    })
    Vue.set(state.todos, 'done', done)
    Vue.set(state.todos, 'undone', undone)
  },
  SET_LOADING (state, loadingState) {
    state.isLoading = loadingState
  }
}

export const actions = {
  // eslint-disable-next-line camelcase
  async getTodos ({ commit }, user_id) {
    const formData = new FormData()
    formData.set('user_id', user_id)
    const res = await this.$axios({
      url: 'http://localhost/taskList.php',
      method: 'post',
      data: formData
    })
    if (res.status === 200) {
      // eslint-disable-next-line no-unused-vars
      const data = res.data
      commit('SET_TODO', data)
      return true
    }
    return false
  },
  async setTodoState ({ commit, dispatch }, taskState) {
    const formData = new FormData()
    formData.set('name', taskState.name)
    formData.set('user_id', taskState.user_id)
    formData.set('state', taskState.state ? '0' : '1')
    const res = await this.$axios({
      url: 'http://localhost/updateTask.php',
      method: 'post',
      data: formData
    })
    if (res.status === 200) {
      await dispatch('getTodos', taskState.user_id)
    }
  },
  async deleteTodo ({ dispatch }, taskToDelete) {
    const formData = new FormData()
    formData.set('name', taskToDelete.name)
    formData.set('user_id', taskToDelete.user_id)
    const res = await this.$axios({
      url: 'http://localhost/deleteTask.php',
      method: 'post',
      data: formData
    })
    if (res.status === 200) {
      await dispatch('getTodos', taskToDelete.user_id)
    }
  },
  async createTodo ({ commit }, newTask) {
    commit('SET_LOADING', true)
    commit('SET_ERROR', '')
    const formData = new FormData()
    formData.set('name', newTask.name)
    formData.set('user_id', newTask.user_id)
    const res = await this.$axios({
      url: 'http://localhost/createTask.php',
      method: 'post',
      data: formData
    })
    commit('SET_LOADING', false)
    if (res.status === 200) {
      return true
    }
    if (res.status === 202) {
      commit('SET_ERROR', 'MYSQL CONNECTION ERROR')
      return false
    }
    if (res.status === 203) {
      commit('SET_ERROR', 'THAT TASK ALREADY EXISTS')
      return false
    }
  }
}

export const getters = {
  doneTodos: state => state.todos.done,
  undoneTodos: state => state.todos.undone,
  isLoading: state => state.isLoading,
  error: state => state.error
}
