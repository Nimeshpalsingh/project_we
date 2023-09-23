import logo from './logo.svg';
import './App.css';
import PublicRoutes from './routes/PublicRoutes';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter >
      <PublicRoutes />
    </BrowserRouter>
  );
}

export default App;
