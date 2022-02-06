<template>
 <div class="todo">
   <AppHeader />
    <div class="todo__body">
      <AppFilter :filter="filter" @search="setSearchText" @filter-click="setFilterType" />
      <AppList :data="filteredDate" />
    </div>
    <AppForm />
 </div>
</template>

<script>
import AppHeader from '@/components/AppHeader'
import AppFilter from '@/components/AppFilter'
import AppForm from '@/components/AppForm'
import AppList from '@/components/AppList'
import { useStore } from 'vuex'
import { computed, ref } from 'vue'
export default {
  components: {
    AppHeader,
    AppFilter,
    AppForm,
    AppList
  },
  setup (props) {
    const store = useStore()
    const filter = ref('all')
    const searchInput = ref('')
    const setFilterType = (tab) => {
      filter.value = tab
    }
    const setSearchText = (text) => {
      console.log(text)
      searchInput.value = text
    }
    const filteredDate = computed(() => {
      return store.state.data.filter(item => {
        if (filter.value !== 'all') {
          return item[filter.value]
        }
        return true
      })
        .sort((a, b) => {
          if (!a.active && b.active) {
            return 1
          }
          if (a.active && !b.active) {
            return -1
          }
          return 0
        })
        .filter(item => {
          if (searchInput.value) {
            return item.text.toLowerCase().includes(searchInput.value.toLowerCase())
          }
          return true
        })
        .sort((a, b) => {
          if (!a.done && b.done) {
            return -1
          }
          if (a.done && !b.done) {
            return 1
          }
          return 0
        })
    })
    return {
      filteredDate,
      filter,
      setFilterType,
      setSearchText
    }
  }
}

</script>
<style lang="scss" scoped>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
  display: flex;
  overflow: auto;
}
.todo {
  max-width: 650px;
  width: 100%;
  margin: auto;
  background: #3a6186;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to top, #89253e, #3a6186);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to top, #89253e, #3a6186); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  -webkit-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
  box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
  border-radius: 30px;
  padding: 60px 100px;
  &__body {
    margin-top: 167px;
  }
}

</style>
