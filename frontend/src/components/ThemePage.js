import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ThemePage = () => {
  const { id } = useParams(); // Получаем значение параметров из URL
  // Теперь переменная id содержит значение из URL, например, /theme/123 -> id будет равно "123"

  useEffect(() => {
    // Действия, которые нужно выполнить при загрузке страницы с темой
    // Примерно что-то вроде загрузки данных о теме с использованием id
  }, [id]);

  return (
    <div>
      <h3>Тема {id}</h3>
      {/* Содержимое страницы с темой */}
    </div>
  );
};

export default ThemePage;