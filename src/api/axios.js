import axios from 'axios'
const instance = axios.create({
  baseURL: 'https://vue-todo-2050e-default-rtdb.firebaseio.com'
})

export default instance
