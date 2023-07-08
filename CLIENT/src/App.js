
import './App.css';
import Header from './Components/Header/Header';
import DataProvider from './Context/DataProvider';
import { Route, Routes } from 'react-router-dom';
import HomePage from './Components/HomePage';
import ContactDetails from './Components/ContactDetails';
import RequestService from './Components/RequestService';
import ServiceStatus from './Components/ServiceStatus';
import AdminPanel from './Components/AdminPanel';
import Navbar from './Components/Navbar';
function App() {
  return (
    <DataProvider>
      <Header />
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/contact" element={<ContactDetails/>} />
        <Route path="/request" element={<RequestService/>} />
        <Route path="/status/:requestId" element={<ServiceStatus/>} />
        <Route path="/admin" element={<AdminPanel/>} />
      </Routes>
    </DataProvider>
  );
}

export default App;
