export const setToken = () => {
  const token = localStorage.getItem('loggedInfo')

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  return config
}