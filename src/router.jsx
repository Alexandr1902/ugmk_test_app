import React, { useEffect } from 'react';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { SELECT_DATA } from './utils/constants';
import { StartPage } from './pages/StartPage/StartPage';
import { OneProduct } from './pages/OneProduct/OneProduct';
import './index.css'


export const Router = () => {
  const navigate = useNavigate();
  const { filterItem } = useParams();

  useEffect(() => {
    navigate(filterItem || SELECT_DATA[0].key);
  }, [])

  return (
    <div className="wrapper">
      <Routes>
        <Route path={`/:filterItem`} element={<StartPage selectData={SELECT_DATA} />}/>
        <Route path="/details/:factoryId/:monthNumber" element={<OneProduct />}/>
      </Routes>
    </div>
  )
}
