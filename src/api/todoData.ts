import axios from './axios'
import DataItems from '@/types/DataItems'
async function postData (data: DataItems): Promise<any> {
  try {
    const res = await axios.post('/data.json', data)
    return res
  } catch (e) {
    console.log(e)
  }
}
async function getData (): Promise<any> {
  try {
    const res = await axios.get('/data.json')
    return res
  } catch (e) {
    console.log(e)
  }
}
async function deleteData (id: number | string) {
  try {
    const res = await axios.delete(`/data/${id}.json`)
    return res
  } catch (e) {
    console.log(e)
  }
}
async function putData (id: number | string, data: DataItems) {
  try {
    const res = await axios.put(`/data/${id}.json`, data)
    return res
  } catch (e) {
    console.log(e)
  }
}

export { postData, getData, deleteData, putData }
