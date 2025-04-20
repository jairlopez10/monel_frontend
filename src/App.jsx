import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layout/Layout';
import Inicio from './paginas/Inicio';
import Hospedaje from './paginas/Hospedaje';
import Nosotros from './paginas/Nosotros';
import Checkout from './paginas/Checkout';
import { Reservaprovider } from './context/Reservaprovider';


function App() {

  return (
    <BrowserRouter>
      <Reservaprovider>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Inicio />}/>
            <Route path='/:titulo/:id' element={<Hospedaje />}/>
            <Route path='/checkout' element={<Checkout />}/>
            <Route path='/nosotros' element={<Nosotros />}/>
          </Route>
        </Routes>
      </Reservaprovider>
    </BrowserRouter>
  )
}

export default App
