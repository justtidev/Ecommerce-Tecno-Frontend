import { useEffect, useState } from 'react';

import axios from 'axios';
import { Pagination } from "flowbite-react";
import { Banner } from './components/Banner.jsx';
import Listado from './Listado.jsx';
import Navbar from './components/Navbar.jsx';
import Buscador from './components/Buscador.jsx';

import Filter2 from './components/Filter2.jsx';
import WhatsAppButton from './components/WhatsAppButton.jsx';
import Footer from './components/Footer.jsx';
//import Home from './Home.css';


function Home() {

  const [loading, setLoading] = useState(false);
  const [verDisponibles, setVerdisponibles] = useState(true);
  const [data, setData] = useState([]);
  const [cantidadItems, setCantidadItems] = useState(0);
  const [pagina, setPagina] = useState(1);
  const [filtro, setFiltro] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(0);
  
  const [rangoPrecio, setRangoPrecio] = useState({ min: '', max: '' });




  const buscarItems = () => {

    axios.get(`/producto/lista?pagina=${pagina}&cantidad=4&filtro=${filtro}&categoria=${categoriaSeleccionada}&rangoPrecio=${rangoPrecio.min},${rangoPrecio.max}`).then((respuesta) => {
      console.log("***", respuesta)
      //
      setLoading(false);
      if (respuesta.status === 200) {
        console.log("respuesta correcta !", respuesta.data.data.rows)
        setData(respuesta.data.data.rows)
        setCantidadItems(respuesta.data.data.count)
      } else {
        console.log("error")
      }

    }).catch((error) => {
     setData([]) 
     setCantidadItems(0)
     console.log("error", error)
    });

  }

  useEffect(() => {

    buscarItems()

  }, [pagina, categoriaSeleccionada, filtro, rangoPrecio])
  console.log('Precio', rangoPrecio)

  useEffect(() => {

    console.log("cambio rangoPrecio", rangoPrecio);

    buscarItems()

  }, [verDisponibles])


  useEffect(() => {

    setLoading(true);
    //console.log("inicia busqueda")
    buscarItems()
    //obtenerCategorias()

  }, [])

  
    
  const onPageChange = (page) => setPagina(page);

  return (
    <>
      <div className=' max-w-8xl font-bold text-center bg-yellow-400 '>
        <Navbar />
      </div>

      <Banner />

      <div className="grid grid-cols-12 p-5 ">


        <div className='col-span-4 md:col-span-2 '>
          <div className="">
            <Buscador filtro={filtro} setFiltro={setFiltro} />
          </div>
          <div>
            <Filter2 setCategoriaSeleccionada={setCategoriaSeleccionada}
              setRangoPrecio={setRangoPrecio} />
          </div>

        </div>
        <div className="bg-white col-span-8 mx-auto backdrop:md:col-span-10 mt-2">
          <div className='max-w-6xl pt-5 mx-auto'>




            {(loading == true) ?
              <div>Cargando...</div>

              :
              <div> <Listado productos={data} filtro={filtro} categoria={categoriaSeleccionada} rangoPrecio={rangoPrecio} /> </div>
            }
          </div>
          <div className='flex justify-center w-full'>

          {data && data.length > 0 &&  
            <div className="flex my-10 overflow-x-auto sm:justify-center">
             
              <Pagination currentPage={pagina} totalPages={parseInt(cantidadItems / 4)} onPageChange={onPageChange} />
            </div>
          }

          </div>

        </div>
      </div>

      <WhatsAppButton />
      <div className='w-full'>
        <Footer id='Contacto' />
      </div>

    </>
  )
}




export default Home
