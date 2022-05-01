<template>
  <div class="todo-filter" @click="increase">
    <div class="todo-filter__search">
      <input v-model="searchInput" type="text" placeholder="type to search..." ref="inputSearchTag">
    </div>
    <div class="todo-filter__filter">
      <button v-for="tab in tabs" :key="tab.type" :class="{active: filter === tab.type}" @click="clickFilterItem(tab)">
        {{tab.title}}
      </button>
    </div>
  </div>
</template>
<script>
import { ref, watch } from 'vue'
// import { useCounter } from '@/use/counter'

export default {
  props: {
    filter: {
      type: String,
      default: 'all'
    }
  },
  setup (props, context) {
    // const activeTabType = 'all'
    const searchInput = ref('')
    const inputSearchTag = ref('')
    const tabs = ref([
      { type: 'all', title: 'all', id: 0 },
      { type: 'active', title: 'active', id: 1 },
      { type: 'done', title: 'done', id: 2 }
    ])
    watch(searchInput, (oldVal, newVal) => {
      context.emit('search', searchInput.value)
    })
    const clickFilterItem = (tab) => {
      context.emit('filter-click', tab.type)
    }
    return {
      tabs,
      // activeTabTypes,
      searchInput,
      inputSearchTag,
      clickFilterItem
    }
  }
}
</script>
<style lang="scss" scoped>
.todo-filter {
  display: flex;
  align-items: center;
  &__filter {
    button {
      padding: 1px 11.5px;
      border: none;
      border-bottom: 2px solid transparent;
      transition: border-color .2s linear;
      font-family: 'Inter';
      background: transparent;
      font-size: 16px;
      line-height: 19px;
      color: #fff;
      font-weight: 500;
      transition: all .2s linear;
      &:hover {
        color: darken(#fff, 16%)
      }
      &.active {
        border-color: #8A4FFF;
      }
    }
  }
  &__search {
    margin-right: 25px;
    input {
      background: rgba(195, 190, 247, 0.2);
      border-radius: 18px;
      outline: none;
      border: none;
      font-family: 'inter';
      font-weight: 300;
      padding: 15px 45px;
      font-size: 16px;
      line-height: 19px;
      color: #fff;
      height: 55px;
      max-width: 240px;
      width: 100%;
      &::placeholder {
        color: #fff;
      }
    }
  }
}
</style>
