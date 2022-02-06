<template>
  <div class="todo-item" :class="[{active: item.active}, {done: item.done}]" @click="$store.dispatch('editItem', {id: item.id, data: item, property: 'done'})">
    <div class="todo-item__text">
      {{item.text}}
    </div>
    <div class="todo-item__actions">
      <button @click.stop="$store.dispatch('editItem', {id: item.id, data: item, property: 'active'})" v-if="!item.done">
         <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-exclamation-circle" viewBox="0 0 16 16">
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
          <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
        </svg>
      </button>
      <button @click.stop="$store.dispatch('deleteItem', item.id)">
       <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-x-circle" viewBox="0 0 16 16">
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
        </svg>
      </button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  }

}
</script>
<style lang="scss" scoped>
.todo-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14.5px 20px 14.5px 40px;
  background: rgba(195, 190, 247, 0.2);
  border-radius: 18px;
  color: #fff;
  transition: all .2s linear;
  &.active {
    color: #00adff;
  }
  &.done {
    text-decoration: line-through;
    // color: #fff;
  }
  &__actions {
    display: flex;
    align-items: center;
    button + button {
      margin-left: 12px;
    }
    svg {
      transition: fill .2s linear;
      fill: #c3a4fe;
      width: 20px;
      height: 20px;
    }
    button {
      &:hover {
        svg {
          fill: #8f64e0;
        }
      }

    }
  }
}

</style>
