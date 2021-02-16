import axios from 'axios'

export const httpClient = axios.create({
  baseURL: '/api/',
  widthCredentials: true,
  headers: {
    'Accept': 'applicaton/json'
  }
})
