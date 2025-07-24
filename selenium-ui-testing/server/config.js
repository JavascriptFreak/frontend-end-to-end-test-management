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
    logout: ['#nav-link-accountList', '#nav-signout'],  // Adjust based on your site
    addToCartBtn: ['#add-to-cart-button', '.add-to-cart-button'],
    paginationNext: ['.s-pagination-next', '.a-last a'],
  }
};

// module.exports = {
//   user: {
//     username: 'testuser',
//     password: 'testpass',
//   },
//   selectors: {
//     login: {
//       username: ['#realUsernameInput'],
//       password: ['#realPasswordInput'],
//       loginBtn: ['.real-login-button']
//     },
//     logout: ['.menu-logout'],
//     addToCartBtn: ['.product-add'],
//     paginationNext: ['.pagination-next'],
//   }
// };
