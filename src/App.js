import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Forms from './components/Forms';
import Scan from './components/Scan';
function App() {
  return (

    <BrowserRouter>

      <Routes>
        <Route path='/' element={<Forms />} />
        <Route path='/scan' element={<Scan />} />
      </Routes>

    </BrowserRouter>

  );
}

export default App;
