import axios from './axios'
async function postData (data) {
  const res = await axios.post('/data.json', data)
  return res
}
async function getData () {
  const res = await axios.get('/data.json')
  return res
}
async function deleteData (id) {
  const res = await axios.delete(`/data/${id}.json`)
  return res
}
async function putData (id, data) {
  const res = await axios.put(`/data/${id}.json`, data)
  return res
}

export { postData, getData, deleteData, putData }
