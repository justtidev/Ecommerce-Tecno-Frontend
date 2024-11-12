import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Filter2 = ({ setCategoriaSeleccionada, setRangoPrecio }) => {
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionadaLocal, setCategoriaSeleccionadaLocal] = useState("");
  const [minPrecio, setMinPrecio] = useState("");
  const [maxPrecio, setMaxPrecio] = useState("");



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


  const manejarCambioCategoria = (e) => {
    const valor = e.target.value;
    setCategoriaSeleccionadaLocal(valor);
    setCategoriaSeleccionada(valor);
  };


  const manejarCambioPrecio = () => {
    setRangoPrecio({ min: minPrecio, max: maxPrecio });
  };


  return (
    <Accordion className="mx-10 w-full lg:w-60 " sx={{ backgroundColor: "", borderColor: 'gray', borderRadius: '8px', borderWidth: '1px' }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'gray' }} />}>
        <Typography variant='button' sx={{ color: 'gray', fontWeight: 'normal', mx: '1', fontFamily: '' }}>Filtros</Typography>
      </AccordionSummary>
      <AccordionDetails className="flex flex-col p-4">

        <div className="mb-4">
          <label className="block mb-2 text-sm font-semibold" htmlFor="categoria">
            Categoría:
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-400 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400"
            value={categoriaSeleccionadaLocal}
            onChange={manejarCambioCategoria}
          >
            <option className='mr-2' value="">Seleccione 1 categoría</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nombre}
              </option>
            ))}
          </select>
        </div>


        <div className="mb-4">
          <label className="block mb-2 text-sm font-semibold" htmlFor="precio_min">
            Precio Mínimo:
          </label>
          <input
            id="precio_min"
            type="number"
            className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2"
            value={minPrecio}
            onChange={(e) => setMinPrecio(e.target.value)}
            onBlur={manejarCambioPrecio}
          />
        </div>


        <div className="mb-4">
          <label className="block mb-2 text-sm font-semibold" htmlFor="precio_max">
            Precio Máximo:
          </label>
          <input
            id="precio_max"
            type="number"
            className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2"
            value={maxPrecio}
            onChange={(e) => setMaxPrecio(e.target.value)}
            onBlur={manejarCambioPrecio}
          />
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default Filter2; 