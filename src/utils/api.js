import axios from 'axios';


export const fetchProductData = () => {
  return axios.get(`${REACT_APP_API}/products`)
      .then((res) => res.data)
      .catch(e => console.error('Ошибка при получении списка продуктов: ' ,e));
}
