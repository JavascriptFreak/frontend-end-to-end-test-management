module.exports = {
  baseUrl: 'https://www.saucedemo.com/',
  user: {
    username: 'standard_user',
    password: 'secret_sauce',
  },
  searchKeyword: 'sample',
  selectors: {
    login: {
      username: ['input[type="text"]', 'input[name*="user"]'],
      password: ['input[type="password"]'],
      loginBtn: ['button[type="submit"]', 'input[type="submit"]', 'button.login'],
    },
    searchInput: ['input[type="search"]', 'input[name*="search"]'],
    categories: ['nav a', '.categories a', '.side_categories a'],
    productCards: ['.product', '.product-card', '.inventory_item', '.product_pod'],
    paginationNext: ['.pagination .next a', '.pager .next a', 'a[rel="next"]'],
    productLinks: ['a[href*="product"]', '.inventory_item a', 'h3 a'],
    addToCartBtn: ['button.add-to-cart', '.btn_primary', '.btn-add-to-cart'],
    logout: ['a[href*="logout"]', 'button.logout', '#logout_sidebar_link'],
  }
};
