import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://192.168.1.93:4444',
  timeout: 99000,
  headers: {
    'Content-Type': 'application/json',
  },
})
