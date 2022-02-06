<template>
  <div class="todo-header">
    <h2 @click="increase">todo<span>ist</span></h2>
    <div class="todo-header__number">
      {{countTodo}} more to do, {{doneCount}} done
    </div>
  </div>
</template>
<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
export default {
  setup () {
    const store = useStore()
    const countTodo = computed(() => store.getters.todoCount)
    const doneCount = computed(() => store.getters.doneCount)
    return {
      countTodo,
      doneCount
    }
  }
}
</script>
<style lang="scss" scoped>
.todo-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 167px;
  border: none;
  background: transparent;
  color: #fff;
  h2 {
    font-weight: 700;
    font-size: 40px;

    span {
      color: rgb(138, 79, 255);
    }
  }
}
</style>
