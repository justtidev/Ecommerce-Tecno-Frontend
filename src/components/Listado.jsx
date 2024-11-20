
import React, { useState, useContext, useEffect } from 'react';
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import Carrito from './CarritoCompras'

import { CarritoContext } from '../context/CarritoContext';
function Listado({productos, rangoPrecio, setCupon, setDescuento, descuento, cupon}) {
  const { agregarAlCarrito } = useContext(CarritoContext);
  const navigate = useNavigate();
  
 

 
  const handleVerDetalles = (id) => {
    navigate(`/detalleProducto/${id}`);
  
    console.log('funciona el navigate')
};

const handleAgregarAlCarrito = (producto) => {
  agregarAlCarrito(producto)
  console.log('producto', producto)
  alert("Producto agregado")
 }

 const handlePrecioUnitario =(precioUnitario) =>{
  const precioCupon =  precioUnitario -(precioUnitario *(descuento/100))
  return precioCupon
 }

/*  useEffect(() => {
    handleAgregarAlCarrito();
}, [id]); */


 

  return (
    <>
    
        
          <div className="ml-20 max-w-4xl px-4 py-2 sm:px-6  lg:max-w-7xl lg:px-8">

            <div id="Productos" className="mt-2 grid grid-cols-3  gap-x-6 gap-y-6 sm:grid-cols-1 sm:gap-x-4 lg:grid-cols-2  xl:gap-x-8">

              {productos.map((producto, index) =>
                  
                <div key={producto.id} className=" sm:w-4/6 md:w-full ml-2 p-2 mx-auto  overflow-hidden rounded-2xl bg-white border-2 border-gray-400 shadow-slate-600 shadow-xl ">
                 <div className="">
                    <img src={(producto.Imagens[0].ubicacion)}
                      className="object-cover h-[150px] w-full" />

                  </div> 
                  {/* <div className=" flex flex-col-1 "> */}
                    <div className='grid place-items-center gap-2' >
                      <h3 className="mt-2 text-l text-gray-700 font-extrabold ">


                        {producto.nombre}

                      </h3>
                      <p className=" grid content-center text-justify p-2 mx-6 text-sm text-gray-500 min-h-16  ">{producto.descripcionBreve}</p>
                      <p className="text-md font-semibold text-gray-800">${descuento>0 ? handlePrecioUnitario(producto.precioUnitario) : producto.precioUnitario} </p>

                      <button onClick={() => handleAgregarAlCarrito(producto)}  className=" btn rounded-lg p-2 ">Agregar al carrito</button>
                      <button type='submit' onClick={() => handleVerDetalles(producto.id)} className='underline' >Mas detalles</button>
                  


                    </div>
                  </div>
                /* </div> */

              )}
            </div>
          </div>
     {console.log('productos',productos)  } 
      
      {productos.length === 0  && (
        <div className="w-full text-center mt-6 text-gray-600">
          No se encontraron productos que coincidan con la búsqueda.
        </div>
      )}
      
     
    </>
  );
}
export default Listado;