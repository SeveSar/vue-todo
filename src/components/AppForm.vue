<template>
  <form class="todo-form" @submit.prevent="submitForm">
    <input type="text" v-model="inputText" placeholder="what needs to be done?" ref="input">
    <button type="submit">add</button>
  </form>
</template>
<script>
import { ref } from '@vue/reactivity'
import { useStore } from 'vuex'
export default {
  setup () {
    const inputText = ref('')
    const store = useStore()
    const input = ref(null)
    const submitForm = () => {
      if (!inputText.value) {
        return false
      }
      store.dispatch('addNewItem', { text: inputText.value, active: false, done: false })
      inputText.value = ''
      input.value.focus()
    }
    return {
      inputText,
      submitForm,
      input
    }
  }
}
</script>
<style lang="scss" scoped>
.todo-form {
  button {
    width: 100px;
    height: 55px;
    background: #8A4FFF;
    box-shadow: 0px 5px 10px rgba(138, 79, 255, .20%);
    border-radius: 50px;
    color: #fff;
    margin-top: 30px;
  }
  input {
    height: 55px;
    width: 100%;
    background: rgba(195, 190, 247, 0.2);
    border-radius: 18px;
    outline: none;
    border: none;
    font-family: 'Inter';
    font-weight: 300;
    padding: 15px 45px;
    font-size: 16px;
    line-height: 19px;
    color: #fff;
    flex-grow: 1;
    max-width: 335px;
    background: rgba(195, 190, 247, 0.2);
    border-radius: 50px;
    padding: 0 25px;
    margin-right: 15px;
    &::placeholder {
      color: #fff;
    }
  }
}
</style>
