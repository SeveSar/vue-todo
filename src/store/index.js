import { createStore } from 'vuex'
import { getData, postData, deleteData, putData } from '@/api/todoData'

function serializeData (obj) {
  return Object.keys(obj).reduce((acc, item) => {
    acc.push({
      id: item,
      ...obj[item]
    })
    return acc
  }, [])
}
const store = createStore({
  state () {
    return {
      data: []
    }
  },
  getters: {
    data: state => state.data,
    todoCount: state => state.data.filter(item => !item.done).length,
    doneCount: state => state.data.filter(item => item.done).length
  },
  mutations: {
    addNewItem (state, data) {
      state.data.push(data)
    },
    setData (state, data) {
      state.data = data
    },
    delItem (state, id) {
      state.data = state.data.filter(item => item.id !== id)
    },
    async editItem (state, { id, data, property }) {
      const currentItem = state.data.find(item => item.id === id)
      if (property === 'done') {
        currentItem.active = false
        currentItem[property] = !currentItem[property]
      } else {
        currentItem[property] = !currentItem[property]
      }
      await putData(data.id, currentItem)
    }
  },
  actions: {
    async loadItems ({ commit }) {
      const res = await getData()
      const data = serializeData(res.data)
      commit('setData', data)
    },
    async addNewItem ({ commit }, data) {
      const res = await postData(data)
      commit('addNewItem', {
        ...data,
        id: res.data.name
      })
    },
    async deleteItem ({ commit }, id) {
      await deleteData(id)
      commit('delItem', id)
    },
    async editItem ({ commit }, data) {
      commit('editItem', data)
    }
  },
  modules: {
  }
})

store.dispatch('loadItems')

export default store
