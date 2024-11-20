import { useEffect, useState } from 'react';

import axios from 'axios';
import { Pagination } from "flowbite-react";
import { Banner } from './components/Banner.jsx';
import Listado from './components/Listado.jsx';
import Navbar from './components/Navbar.jsx';
import Buscador from './components/Buscador.jsx';
import Cupones from './components/Cupones.jsx';

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
  
  const [minPrecio, setMinPrecio] = useState(0);
  const [maxPrecio, setMaxPrecio] = useState(0);
  const [cupon, setCupon] =useState('')
  const [descuento, setDescuento] = useState("0")

  const obtenerCupones =  () => {
    axios.get("/cupones/").then((respuesta)=> {
     console.log('Cupones' + respuesta)
     if (respuesta.status === 200) {
       console.log("respuesta", respuesta.data.data)
   /*    setCupon(respuesta)
      setDescuento(cupon.descuento)
     console.log('Cupon',cupon) */
    
     } else {
       console.log("error")
     }

   }).catch((error) => {
    setCupon([]) 
    
    console.log("error", error)
   });

   
  useEffect(() => {
    obtenerCupones();
  
    
  }, [])
}


  const buscarItems = () => {

    axios.get(`/producto/lista?pagina=${pagina}&cantidad=4&filtro=${filtro}&categoria=${categoriaSeleccionada}&minPrecio=${minPrecio}&maxPrecio=${maxPrecio}`).then((respuesta) => {
     
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

  }, [pagina, categoriaSeleccionada, filtro, minPrecio, maxPrecio, ])
  

  useEffect(() => {

   

    buscarItems()

  }, [verDisponibles, ])


  useEffect(() => {

    setLoading(true);
    //console.log("inicia busqueda")
    buscarItems()
    //obtenerCategorias()

  }, [])

  
    
  const onPageChange = (page) => setPagina(page);

  return (
    <>
    <div className=''>
      <div className='max-w-8xl  text-center'>
        <Navbar />
      </div>
<div>
      <Banner />
      </div>
      

      <div className="grid grid-cols-12 p-5 ">


        <div className=' col-span-4 grid grid-cols-1 justify-items-center  place-content-start  gap-4 m-4 md:col-span-3 '>
          <div className=" w-full">
            <Buscador filtro={filtro} setFiltro={setFiltro} />
          </div>
          <div>
            <Filter2 className="bg-red-100" setCategoriaSeleccionada={setCategoriaSeleccionada} categoriaSeleccionada={categoriaSeleccionada}
             minPrecio={minPrecio} maxPrecio= {maxPrecio} setMinPrecio={setMinPrecio} setMaxPrecio={setMaxPrecio} setFiltro= {setFiltro}/>
          </div>
          <div> <Cupones setCupon={setCupon} cupon={cupon} /></div>
          

        </div>
        <div className="bg-white col-span-8 mx-auto backdrop:md:col-span-10 ">
          <div className='max-w-6xl pt-5 mx-auto'>




            {(loading == true) ?
              <div>Cargando...</div>

              :
              <div> <Listado productos={data} filtro={filtro} categoria={categoriaSeleccionada}  setMinPrecio={setMinPrecio} setMaxPrecio={setMaxPrecio} cupon={cupon} setDescuento={setDescuento} descuento={descuento}/> </div>
            }
          </div>
          <div className='flex justify-center w-full'>
            {cantidadItems > 4 
          && data && data.length > 0 &&  
            <div className="flex mr-10 ml-0 my-4 overflow-x-auto sm:justify-center">
             
              <Pagination currentPage={pagina} totalPages={parseInt(cantidadItems / 4)} onPageChange={onPageChange} previousLabel='Anterior' nextLabel='Siguiente'/>
            </div>
          }

          </div>

        </div>
      </div>

      <WhatsAppButton />
      <div className='w-full'>
        <Footer id='Contacto' />
      </div>
      </div>
    </>
  )
}




export default Home
