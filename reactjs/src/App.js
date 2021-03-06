import './css/index.css'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout/Layout';
import MainPage from './components/Pages/MainPage/MainPage';
import Product from './components/Pages/Product/Product';
import ErrorPage from './components/Pages/Error/ErrorPage';
import LogReg from './components/Pages/LogReg/LogReg';

function App() {
  return (
    <Layout>

      <Routes>

        <Route path='/' element={ <MainPage /> } />
        <Route path='/product/:id' element={ <Product /> } />
        <Route path='/credentials' element={ <LogReg /> } />
        <Route path='/error' element={ <ErrorPage /> } />

      </Routes>

    </Layout>
  );
}

export default App;
