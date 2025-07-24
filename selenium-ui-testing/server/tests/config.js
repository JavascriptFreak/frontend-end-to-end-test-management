module.exports = {
  user: {
    username: 'yourUsername',
    password: 'yourPassword'
  },
  selectors: {
    login: {
      username: ['#username', '#user'],
      password: ['#password', '#pass'],
      loginBtn: ['#loginBtn', '.btn-login']
    },
    logout: ['#logout', '.logout-btn'],
    addToCartBtn: ['.add-to-cart'],
    paginationNext: ['.next-page'],
  }
};
