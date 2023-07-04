
import './App.css';
import Header from './Components/Header/Header';
import DataProvider from './Context/DataProvider';
import Home from './Components/Home/Home';
import { Route, Routes } from 'react-router-dom';
import BookSlot from './Components/Home/BookSlot';
function App() {
  return (
    <DataProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bookslot" element={<BookSlot />} />
      </Routes>
    </DataProvider>
  );
}

export default App;
