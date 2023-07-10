import moment from 'moment';
import 'moment/locale/ru';
import { FACTORY_NUMBER } from './constants';


const getMonth = (date) => {
  if (!date) return null;
  const month = moment(date, 'DD/M/YYYY').month() + 1;
  const year = moment(date, 'DD/M/YYYY').year();
  const formattedDate = `${month}/${year}`;

  return formattedDate;
};

const getMonthRus = (date) => {
  if (!date) return null;
  const newDate = moment(date, 'DD/M/YYYY').format('MMMM');
  const formattedDate = newDate.charAt(0).toUpperCase() + newDate.slice(1, 3);

  return formattedDate;
};

export const getData = (data, filter, factoryNumber = '', active = false) => {
  let result = [];

  const filteredData = data?.filter((obj) => obj.date !== null);
  const reducedObj = filteredData?.reduce((acc, { factory_id, product1, product2, date }) => {
    const month = getMonthRus(date);
    const monthNumber = getMonth(date);
    let value;

    if (filter === 'all') {
      value = product1 + product2;
    } else if (filter === 'product1') {
      value = product1;
    } else if (filter === 'product2') {
      value = product2;
    }

    if (!acc[monthNumber]) {
      acc[monthNumber] = {
        [factory_id]: {
          total: 0,
          product1: 0,
          product2: 0,
        },
        monthNumber,
        month,
      };
    }

    if (!acc[monthNumber][factory_id]) {
      acc[monthNumber][factory_id] = {
        total: 0,
        product1: 0,
        product2: 0,
      };
    }

    acc[monthNumber][factory_id].total += value;
    acc[monthNumber][factory_id].product1 += product1;
    acc[monthNumber][factory_id].product2 += product2;

    return acc;
  },
    {}
  );

  if (reducedObj) {
    result = Object.entries(reducedObj)?.map(item => item[1]);
  }


  // Переводим все значения из киллограмм в тонны
  result.forEach((element) => {
    element['1'].total /= 1000;
    element['2'].total /= 1000;
    element['1'].product1 /= 1000;
    element['1'].product2 /= 1000;
    element['2'].product1 /= 1000;
    element['2'].product2 /= 1000;
  });

  if (factoryNumber === FACTORY_NUMBER[0] && active) {
    result = result.map(item => {
      return {
        1: item[FACTORY_NUMBER[0]],
        month: item.month,
        monthNumber: item.monthNumber,
      }
    });
  }

  if (factoryNumber === FACTORY_NUMBER[1] && active) {
    result = result.map(item => {
      return {
        2: item[FACTORY_NUMBER[1]],
        month: item.month,
        monthNumber: item.monthNumber,
      }
    });
  }

  return result.sort((a, b) => moment(a.monthNumber, 'MM/YYYY') - moment(b.monthNumber, 'MM/YYYY'));
}


export const goOneProductPage = (data, navigate, filter) => {
  const factoryId = data.tooltipPayload[0].dataKey.split('.')[0];
  const monthNumber = data.monthNumber.split('/')[0];

  navigate(`/details/${factoryId}/${monthNumber}`, {
    state: { data, filter },
  });
};

export const returnStartPage = (navigate, filter) => {
  navigate(`/${filter}`);
}
