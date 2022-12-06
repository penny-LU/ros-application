import APi from '@/services/APi'

export default {
  register (credentials) {
    return APi().post('register', credentials)
  },
  login (credentials) {
    return APi().post('login', credentials)
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data))
        }

        return response.data
      })
  },
  forgetPassword (credentials) {
    return APi().post('forgetPassword', credentials)
  }
}

// export an object has register method
// AuthenticationService.register({
//   email: 'testing@gmail.com',
//   password: '123456'
// })
