import './styles/app.scss';
import SettingsBar from './components/SettingsBar';
import Toolbar from './components/ToolBar';
import Canvas from './components/Canvas';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route
            path="/:id"
            element={
              <div>
                <Toolbar />
                <SettingsBar />
                <Canvas />
              </div>
            }
          ></Route>
          <Route
            path="*"
            element={<Navigate to={`f${(+new Date()).toString(16)}`} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
