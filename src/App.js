import logo from './logo.svg';
import './App.css';
import Conteudo from './compontentes/Conteudo';
import Barra_lateral from './compontentes/barra_lateral';
import { useState } from 'react';

function App() {
  const [load,setLoading] = useState(false)
  return (
    <>

      <section className='app'>
        <Conteudo setLoading={setLoading}></Conteudo>
      </section>
    </>
  );
}

export default App;
