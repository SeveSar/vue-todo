import { ref } from 'vue'
// всегда с use
export function useCounter () {
  const count = ref(0)
  const increase = () => count.value++
  return {
    count,
    increase
  }
}
