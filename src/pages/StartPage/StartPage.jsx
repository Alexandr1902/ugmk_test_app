import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchProductData } from '../../utils/api';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import { Select } from '../../components/Select/Select';
import { BAR_COLOR, FACTORY_NUMBER } from '../../utils/constants';
import { getData, goOneProductPage } from '../../utils/helpers';
import styles from './StartPage.module.css';

export const StartPage = ({selectData}) => {
  const navigate = useNavigate();
  const { filterItem } = useParams();
  const [state, setState] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [selectFirstFactory, setSelectFirstFactory] = useState(false);
  const [selectSecondFactory, setSelectSecondFactory] = useState(false);
  const [selectFactoryNumber, setSelectFactoryNumber] = useState("");
  const [filter, setFilter] = useState(filterItem || selectData[0].key);

  const saveFilter = (value) => {
    navigate(`/${value}`);
    setFilter(value);
  };

  useEffect(() => {
    setProductsData(getData(state, filter));
  }, [filter]);

  useEffect(() => {
    navigate(`/${filter}`);
    fetchProductData().then(res => setState(res));
  }, []);

  useEffect(() => {
    setProductsData(getData(state, filter));
  }, [state]);


  useEffect(() => {
    if(selectFactoryNumber === FACTORY_NUMBER[0] && selectFirstFactory) {
      setProductsData(getData(state, filter, selectFactoryNumber, selectFirstFactory));
      return;
    }
    if(selectFactoryNumber === FACTORY_NUMBER[1] && selectSecondFactory) {
      setProductsData(getData(state, filter, selectFactoryNumber, selectSecondFactory));
      return;
    }
    setProductsData(getData(state, filter));
  }, [selectFirstFactory, selectSecondFactory, selectFactoryNumber])

  const showFactory = (data) => {
    setSelectFactoryNumber(data.dataKey.split('.')[0]);
    setSelectFirstFactory(!selectFirstFactory);
    setSelectSecondFactory(!selectSecondFactory);
  }

  return (
    <div className={styles.startPageWrapper}>
      <div className={styles.titleWrapper}>
        <p>Фильтр по типу продукции</p>
        <Select
          saveFilter={saveFilter}
          selectData={selectData}
          filterItem={filterItem}
        />
      </div>
      <div className={styles.chartWrapper}>
        <BarChart width={1000} height={300} data={productsData}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='month' />
          <YAxis />
          <Legend
            onClick={(data) => showFactory(data)}
          />
          <Tooltip />
          <Bar
            className={styles.bar}
            dataKey='1.total'
            fill={BAR_COLOR[0]}
            name='Фабрика А'
            onClick={(data) => goOneProductPage(data, navigate, filter)}
          />
          <Bar
            className={styles.bar}
            dataKey='2.total'
            fill={BAR_COLOR[1]}
            name='Фабрика Б'
            onClick={(data) => goOneProductPage(data, navigate, filter)}
          />
        </BarChart>
      </div>
    </div>
  )
}
