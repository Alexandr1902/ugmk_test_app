import { useEffect } from "react";
import { useRouteError, useNavigate } from "react-router-dom";

export const ErrorPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/error')
  }, []);

  return (
    <div>
      <h2>Упс! Ошибка...</h2>
    </div>
  )
}