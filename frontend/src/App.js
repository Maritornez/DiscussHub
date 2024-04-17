import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Theme from './components/Theme';
import ThemePage from './components/ThemePage';

function App() {
  const [themes, setThemes] = useState([]);

  return (
    <Router>
      <div className="App">
        <div className="left-panel">
          <Routes>
            <Route exact path="/" element={<Theme themes={themes} setThemes={setThemes} />} />
            <Route path="/theme/:id" element={<ThemePage />} />
          </Routes>
        </div>
        <div className="right-panel">
          {/* Другие компоненты или контент */}
        </div>
      </div>
    </Router>
  );
}

export default App;
