const baseUrl = 'https://slim-moms.goit.co.ua/api/v1/';
// const baseUrl = 'http://localhost:8081/api/v1/';

export const url = {
  products: () => `${baseUrl}products/`,
  productsByDay: () => `${baseUrl}user/eats/`,
  logOut: () => `${baseUrl}logout`,
  deleteProductsByDay: () => `${baseUrl}user/eats/`,
  loginUser: () => `${baseUrl}login`,
  registerUser: () => `${baseUrl}register`,
  productsByDate: date => `${baseUrl}user/eats/${date}`,
  userData: () => `${baseUrl}user`,
  products: input => `${baseUrl}products?search=${input}`,
  userEats: date => `${baseUrl}user/eats/${date}`,
  addUserEats: productId => `${baseUrl}user/eats/${productId}`,
  userAchievement: date => `${baseUrl}user/eats/achievement/${date}`,
  quotes: () => `${baseUrl}quotes`
};
