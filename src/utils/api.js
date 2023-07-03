import axios from 'axios';


export const fetchProductData = () => {
  return axios.get(`${}/products`)
      .then((res) => res.data)
      .catch(e => console.error('Ошибка при получении списка продуктов: ' ,e));
}
