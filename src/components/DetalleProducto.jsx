'use client'


import { StarIcon } from '@heroicons/react/20/solid'
import { Radio, RadioGroup } from '@headlessui/react'
import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import { CarritoContext } from '../context/CarritoContext';
import Carrito from './CarritoCompras.jsx';
import { ToastContainer, toast } from 'react-toastify';


const product = {
  colors: [
    { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
    { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
    { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
  ],
};



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function DetalleProducto() {

  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { agregarAlCarrito } = useContext(CarritoContext);

  const [selectedColor, setSelectedColor] = useState(product.colors[0])



  useEffect(() => {
    axios.get(`http://localhost:3000/producto/${id}`)
      .then((respuesta) => {
        setProducto(respuesta.data.data);
        console.log('ProductoId', producto);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al obtener los detalles del producto:", error);
        setError("No se pudo cargar el producto.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center text-2xl">Cargando...</p>;
  if (error) return <p className="text-center text-2xl text-red-600">{error}</p>;

  const handleAgregarAlCarrito = (producto ) => {
  agregarAlCarrito(producto)


  }


  return (
    <>

      <Navbar/>

      <div className="bg-slate-100">


        <div key={producto.id} className="pt-6">

          {/* Image gallery */}
          <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
            <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden shadow-xl rounded-lg lg:block">
              <img
                alt={producto.nombre}
                src={producto.Imagens[0].ubicacion}
                className="h-full w-full object-cover object-center"
              />
            </div>


            <div className="aspect-h-4 aspect-w-3 overflow-hidden shadow-xl rounded-lg">
              <img
                alt={producto.nombre}
                src={producto.Imagens[1].ubicacion}
                className="h-90 w-full object-cover object-center"
              />
            </div>


            <div className="aspect-h-4 aspect-w-3 place-content-center  shadow-xl lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
              <img
                alt={producto.nombre}
                src={producto.Imagens[2].ubicacion}
                className=" h-90 w-full object-center object-cover "
              />
            </div>
          </div>

          {/* Product info NOMBRE*/}
          <div className=" mx-auto bg-slate-100  max-w-2xl px-4  pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 pb-8 lg:pt-16">
            <div className=" lg:col-span-2 lg:border-r shadow:md lg:border-blue-300 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{producto.nombre}</h1>
            </div>

            {/* Options Derecha. Precio, color, boton comprar y Volver */}
            <div className="mt-4 justify-items-center text-sm font-medium text-gray-900 lg:row-span-2 lg:mt-4">
              <h3 className="">Precio </h3>
              <p className="text-3xl   tracking-tight text-gray-900">$ {producto.precioUnitario}</p>



              <div>
                {/* Colors */}
                <div className='place-items-center'>
                  <h3 className="mt-8  text-sm font-medium text-gray-900">Color</h3>

                  <fieldset aria-label="blue" className="mt-4  ">
                    <RadioGroup value={selectedColor} onChange={setSelectedColor} className="flex items-start space-x-3">
                      {product.colors.map((color) => (
                        <Radio
                          key={color.name}
                          value={color}
                          aria-label={color.name}
                          className={classNames(
                            color.selectedClass,
                            'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none data-[checked]:ring-2 data-[focus]:data-[checked]:ring data-[focus]:data-[checked]:ring-offset-1',
                          )}
                        >
                          <span
                            aria-hidden="true"
                            className={classNames(
                              color.class,
                              'h-8 w-8 rounded-full border border-black border-opacity-10',
                            )}
                          />
                        </Radio>
                      ))}
                    </RadioGroup>
                  </fieldset>
                </div>



                <fieldset className="mt-4">

                  <button
                    type="submit"
                    className="btn p-2 mt-10  w-full items-center justify-center text-lg rounded-lg focus:ring-offset-2"
                 onClick={() => handleAgregarAlCarrito(producto,)}   >
                    Agregar al carrito
                  </button>;
                  <ToastContainer/>
                  <div className='mt-10 mx-4 p-4  '>


<Link className='text-blue-500 text-lg hover:font-bold  underline' to="http://localhost:5173" >Volver  </Link>
</div>
{/* Lado izquierdo, Nombre, descripcion, detalle y categoria */}
                </fieldset>
              </div>
            </div>
            <div className="grid pb-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-blue-300  ">
              {/* Description and detsails */}
              <div className="mt-10" >
                <h3 className="text-lg font-bold text-gray-900">Descripcion</h3>

                <div className="mt-4 text-gray-600">
                  <p className="">{producto.descripcionBreve}</p>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-lg font-bold text-gray-900">Detalle</h3>

                <div className="mt-4 text-gray-600">
                  <p>{producto.descripcionDetallada}</p>
                </div>
              </div>

              <div className="mt-10">
                <h2 className="text-lg font-bold text-gray-900">Categoria</h2>


                <div className="mt-4 space-y-6">
                  <p className="">{producto.Categorium.nombre}</p>

                </div>

              </div>

            </div>
          
          </div>

        </div>

      </div>
      
      <Footer/>
    </>
  )
}







