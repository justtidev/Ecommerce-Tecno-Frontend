import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { NoEncryption } from "@mui/icons-material";

const Filter2 = ({ setCategoriaSeleccionada, categoriaSeleccionada, minPrecio, setMinPrecio, maxPrecio, setMaxPrecio, setFiltro }) => {
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionadaLocal, setCategoriaSeleccionadaLocal] = useState("");
 


     

  const obtenerCategorias = async () => {
    try {
      const respuesta = await axios.get("/categoria/");
      setCategorias(respuesta.data.data);
      console.log('Categorias' + categorias)
    } catch (error) {
      console.error("Error al obtener categorías:", error);
    }
  };

  useEffect(() => {
    obtenerCategorias();
    
  }, []);

  
const limpiarFiltro= ()=>{
setMinPrecio(0);
setMaxPrecio(0);
setFiltro("");
setCategoriaSeleccionada(0)
setCategoriaSeleccionadaLocal("default") 

};

  const manejarCambioCategoria = (e) => {
    const valor = e.target.value;
    setCategoriaSeleccionadaLocal(valor);
    setCategoriaSeleccionada(valor);
  };

  



  return (
    <>
    <div className=" grid gap-y-8">
    <Accordion  className=" w-auto text-center border-2  shadow-slate-600 shadow-xl  " /* border-gray-200  focus:outline-none focus:ring-gray-600 focus:border-gray-800 */ sx={{ backgroundColor: " ", borderColor: '', borderRadius: '8px', borderWidth: '1px',
    
     }}>
   
      <AccordionSummary className=" shadow-slate-600 shadow-lg   p-2" expandIcon={<ExpandMoreIcon sx={{fontSize:8,  }} />}>
        <p className="  text-gray-400   ">Filtros</p>
      </AccordionSummary>
      
      <AccordionDetails className="mt-4 text-gray-400 flex flex-col ">

        <div className="mb-4 text-gray-500 ">
          <label className="block  text-sm font-semibold" htmlFor="categoria" >
            Categoría:
          </label>
          <select
            className="w-full px-3 py-2  border-2 rounded-lg  border-gray-200 shadow-md focus:outline-none focus:ring-gray-600 focus:border-gray-800"
            value={categoriaSeleccionadaLocal}
            onChange={manejarCambioCategoria}
            defaultValue={"default"}
          >
            <option className='' value="default">Seleccione 1 categoría</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nombre}
              </option>
            ))}
          </select>
        </div>


        <div className=" text-gray-500 mb-4">
          <label className="block  text-sm font-semibold" htmlFor="precio_min">
            Precio Mínimo:
          </label>
          <input
            id="precio_min"
            type="number"
            className="w-full px-3 py-2  border-2 rounded-lg  border-gray-200 shadow-md focus:outline-none focus:ring-gray-600 focus:border-gray-800"
            
            value={minPrecio}
            onChange={(e) => setMinPrecio(e.target.value)} 
            /* onBlur={manejarCambioPrecio} */
          />
          {console.log(minPrecio)}
        </div>


        <div className="mb-4 text-gray-500">
          <label className="block text-sm font-semibold" htmlFor="precio_max">
            Precio Máximo:
          </label>
          <input
            id="precio_max"
            type="number"
            className="w-full px-3 py-2  border-2 rounded-lg  border-gray-200 shadow-md focus:outline-none focus:ring-gray-600 focus:border-gray-800"
            
            value={maxPrecio}
            onChange={(e) => setMaxPrecio(e.target.value)}
         /*    onBlur={manejarCambioPrecio} */
          />
          {console.log(maxPrecio)}
        </div>
     
      </AccordionDetails>
      
    </Accordion>
     <button className='btn w-auto p-2 rounded-md  ' type='button' onClick={limpiarFiltro}>Limpiar Filtros</button>
     </div>
   </> 
  );
};

export default Filter2; 