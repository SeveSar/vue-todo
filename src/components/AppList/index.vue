<template>
  <ul class="todo-list">
    <li v-for="item in data" :key="item.id">
      <AppListITem :item="item" />
    </li>
  </ul>
</template>
<script>
import AppListITem from '@/components/AppList/AppListITem'
export default {
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  components: {
    AppListITem
  },
  setup () {

  }

}
</script>
<style lang="scss" scoped>
.todo-list {
  margin-top: 15px;
  li:not(:last-child) {
    margin-bottom: 5px;
  }
}
</style>
