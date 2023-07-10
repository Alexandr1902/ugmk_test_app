import axios from 'axios';
import { REACT_APP_API } from '../utils/constants.js';


export const fetchProductData = () => {
  return axios.get(`${REACT_APP_API}/products`)
    .then((res) => res.data)
    .catch(e => console.error('Ошибка при получении списка продуктов: ', e));
}
