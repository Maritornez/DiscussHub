import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import './Theme.css';

const Theme = ({ themes, setThemes }) => {
  useEffect(() => {
    const getThemes = async () => {
      try {
        const response = await fetch("https://localhost:44343/api/Theme/");
        if (!response.ok) {
          throw new Error("Failed to fetch themes");
        }
        const data = await response.json();
        setThemes(data);
      } catch (error) {
        console.error(error);
      }
    };
    getThemes();
  }, [setThemes]);

  return (
    <div className="ThemeList">
      <h3>Темы</h3>
      {themes && themes.map(({ id, name, description }) => (
        <div className="Theme" key={id}>
          <Link to={`/theme/${id}`}>
            <strong>{name}</strong> ({description})
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Theme;
