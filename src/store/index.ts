import { createStore, Store } from 'vuex'
import { InjectionKey } from 'vue'
import { getData, postData, deleteData, putData } from '@/api/todoData'
import DataItems from '@/types/DataItems'

export interface State {
  data: DataItems[],
  loading: boolean
}
export const key: InjectionKey<Store<State>> = Symbol('')
function serializeData (obj: object) {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    acc.push({
      id: key,
      ...value
    })
    return acc
  }, [] as DataItems[])
}
export const store = createStore<State>({
  state () {
    return {
      data: [],
      loading: false
    }
  },
  getters: {
    data: state => state.data,
    loading: state => state.loading,
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
    setLoading (state, value) {
      state.loading = value
    },
    async editItem (state, { id, data, property }: {id: string | number, data: DataItems, property: 'done' | 'active'}) {
      const currentItem = state.data.find(item => item.id === id)
      if (!currentItem) return false
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
      console.log('yyese')
      commit('setLoading', true)
      const res = await getData()
      commit('setLoading', false)
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
  }

})

store.dispatch('loadItems')

export default store
