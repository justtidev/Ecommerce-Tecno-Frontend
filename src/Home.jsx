import { useEffect, useState } from 'react';

import axios from 'axios';
import { Pagination } from "flowbite-react";
import { Banner } from './components/Banner.jsx';
import Listado from './Listado.jsx';
import Navbar from './components/Navbar.jsx';
import Buscador from './components/Buscador.jsx';
import Filter from './components/Filter.jsx';
//import Home from './Home.css';


function Home() {

  const [loading, setLoading] = useState(false);
  const [verDisponibles, setVerdisponibles] = useState(true);
  const [data, setData] = useState([]);
  const [cantidadItems, setCantidadItems] = useState(0);
  const [pagina, setPagina] = useState(1);
  const [categoria, setCategoria] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(0);


  const obtenerCategorias = async () => {
    try {
      setLoading(true);
      const respuesta = await axios.get('/categoria/');
      console.log('categoria' + respuesta.data.data);
      setCategoria(respuesta.data.data);

      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }


  const buscarItems = () => {

    axios.get('/producto/lista?pagina=' + pagina + '&cantidad=8').then((respuesta) => {
      console.log("***", respuesta)

      setLoading(false);
      if (respuesta.status === 200) {
        console.log("respuesta correcta !", respuesta.data.data.rows)
        setData(respuesta.data.data.rows)
        setCantidadItems(respuesta.data.data.count)
      } else {
        console.log("error")
      }

    }).catch((error) => {
      console.log("error", error)
    });

  }

  useEffect(() => {

    buscarItems()

  }, [pagina])

  useEffect(() => {

    console.log("cambio el estado", verDisponibles);

    buscarItems()

  }, [verDisponibles])


  useEffect(() => {

    setLoading(true);
    //console.log("inicia busqueda")
    buscarItems()
    obtenerCategorias()

  }, [])

  const onPageChange = (page) => setPagina(page);

  return (
    <>
      <div className='font-bold text-center bg-yellow-400 '>
        <Navbar />
      </div>

      <Banner />

      <div className='max-w-6xl pt-5 mx-auto'>
        <div>
          <div>Filtros</div>
          <div>

          </div>
          <div> <button onClick={() => setVerdisponibles(!verDisponibles)} className='p-2 text-white bg-red-500 rounded-md'>
            {verDisponibles ? "Mostrar disponibles" : "Mostrar no disponibles"}
          </button> </div>
        </div>

        <select

        /*   name={select} 
          onChange={(e) => setCategoriaSeleccionada(Number(e.target.value))} */
        >
          {categoria.map((categoria, index) => (
            <option key={index} value={categoria.id}>
              {categoria.id} {categoria.nombre}
            </option>
          ))}
          categoria          </select>


        {(loading == true) ?
          <div>Cargando...</div>
          :
          <div> <Listado productos={data} /> </div>
        }
        <div className='flex justify-center w-full'>


          <div className="flex my-10 overflow-x-auto sm:justify-center">
            <Pagination currentPage={pagina} totalPages={cantidadItems / 1} onPageChange={onPageChange} />
          </div>



        </div>
        {/*  */}
      </div>
    </>
  )
}


{/*   useEffect(() => {
        
    
   
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
           {/* <Filtro productos={data}/> 
         </div>
       
      } */}



export default Home
