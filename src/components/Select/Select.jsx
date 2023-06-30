import React from 'react';
import styles from './Select.module.css';


export const Select = ({saveFilter, selectData, filterItem}) => {
  return (
    <select
      className={styles.select}
      onChange={(e) => saveFilter(e.target.value)}
      defaultValue={filterItem || selectData[0].key}
      id='products-select'
      name='products'
    >
      {selectData.map(item => <option key={item.key} value={item.key}>{item.name}</option>)}
    </select>
  )
}
