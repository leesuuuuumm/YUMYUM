export const setToken = () => {
  const token = localStorage.getItem('loggedInfo')

  const config = {
    headers: {
      Authorization: `JWT ${token}`
    }
  }
  return config
}