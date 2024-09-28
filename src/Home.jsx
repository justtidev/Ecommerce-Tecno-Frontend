import { useEffect, useState } from 'react';

import axios from 'axios';
import Listado from './Listado.jsx';

import './Home.css';


function Home() {

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);


  useEffect(() => {
        
    
   
   //axios.defaults.baseURL = 'http://localhost:3000';

    axios.get('http://www.localhost:3000/producto').then((respuesta) => {
      console.log("***",respuesta)

      setLoading(false);
      if (respuesta.status === 200) {
        console.log("respuesta correcta")
        setData(respuesta.data.data)
      } else {
        console.log("error")
      }

    });
},[])
   

  return (
    <>
      <div className='bg-yellow-400 font-bold text-center p-6'>
        APP Ecommerce
      </div>

      {(loading == true) ?
        <div>Cargando...</div> 
        :
        <div>
        
          <Listado productos={data}  />
         </div>
       
      }

    </>
  )
}

export default Home
