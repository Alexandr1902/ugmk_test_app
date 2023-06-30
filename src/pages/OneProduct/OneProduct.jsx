import { useLocation, useNavigate } from 'react-router-dom';
import {
  Cell,
  LabelList,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer
} from 'recharts';
import { PIE_CELL_COLOR } from '../../utils/constants';
import { returnStartPage } from '../../utils/helpers';
import styles from './OneProduct.module.css';

export const OneProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data, filter } = location.state;

  const dataDetails = [
    { name: 'Продукт 1', value: Math.floor(data['1'].product1) },
    { name: 'Продукт 2', value: Math.floor(data['2'].product2) },
  ];
  return (
    <div className={styles.oneProductWrapper}>

      <div className={styles.oneProductTitleWrapper}>
        <button
          onClick={() => returnStartPage(navigate, filter)}
          className={styles.backButton}
        >
          НАЗАД
        </button>
        <h1>
          Статистика продукции {data.tooltipPayload[0].name} за {data.month}
        </h1>
      </div>

      <ResponsiveContainer width='100%' height='50%'>
        <PieChart width={400} height={400}>
          <Legend />
          <Pie
            data={dataDetails}
            cx='50%'
            cy='50%'
            dataKey='value'
          >
            <LabelList
              dataKey='value'
              position='outside'
              offset={15}
              stroke='none'
            />
            {dataDetails.map((item, index) => (
              <Cell
                key={`cell-${item.name}`}
                fill={PIE_CELL_COLOR[index]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
