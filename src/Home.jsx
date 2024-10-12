import { useEffect, useState } from 'react';

import axios from 'axios';
import Listado from './Listado.jsx';
import Navbar from './Navbar.jsx';
import Buscador from './Buscador.jsx';
import Filtro from './Filtro.jsx';
//import Home from './Home.css';


function Home() {

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
        
    
   
   //axios.defaults.baseURL = 'http://localhost:3000';

    axios.get('http://www.localhost:3000/producto').then((respuesta) => {
      console.log("***",respuesta)

      setLoading(false);
      if (respuesta.status === 200) {
        
        setData(respuesta.data.data)

        console.log("respuesta Data" + JSON.stringify(data) )
       
      } else {
        console.log("error")
      }

    });
},[])
   

  return (
    <>
     

      {(loading == true) ?
        <div>Cargando...</div> 
        :
        <div>
        <Navbar/>
        <Buscador/>
         <Listado productos={data} />
           {/* <Filtro productos={data}/> */}
         </div>
       
      }

    </>
  )
}

export default Home
