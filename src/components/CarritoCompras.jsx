import React, { useContext } from 'react';
import { CarritoContext } from '../context/CarritoContext';
import Carrito from './CarritoCompras.jsx'

function CarritoCompras() {
    const { carrito, vaciarCarrito, eliminarDelCarrito, actualizarCantidad } = useContext(CarritoContext);

    const total = carrito.reduce((acc, item) => acc + item.precioUnitario * item.cantidad, 0);

    const handleCantidadChange = (e, id) => {
        const cantidad = parseInt(e.target.value, 10);
        if (cantidad >= 1) {
            actualizarCantidad(id, cantidad);
        }
    };

    return (
        <div className=" border border-gray-500 shadow-lg">
            <h3 className="text-center p-4 text-l font-bold  ">Carrito de Compras</h3>
            <div className=" p-4 lg:h-auto h-auto w-auto ">
                
                <div className=" w-full   lg:w-4-5   ">
                    <ul >
                    
                        {carrito.map((item, i) => (
                            <li className=" p-4 border border-gray-200 rounded-lg shadow-sm" key={i}>
                                <div>
                                    <table className=" table-auto w-full">
                                        <thead>
                                            <tr className="text-center titulo-producto-carrito">
                                                
                                                <th className="pl-4">Producto</th>
                                                <th className="pl-8">Precio</th>
                                                <th className="pl-4">Cantidad</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                {/* <td><img className="w-20 h-20 object-cover" src={item.imagen} alt={item.nombre} /></td> */}
                                               {/*  <td><img className="w-20 h-auto object-cover max-w-full" src={item.imagen} alt={item.nombre} /></td> */}

                                                <td className=" p-2">{item.nombre}</td>
                                                <td className="precio-producto-carrito p-2">${item.precioUnitario}</td>
                                                <td className="p-4">
                                                    <input
                                                        type="number"
                                                        value={item.cantidad}
                                                        min="1"
                                                        onChange={(e) => handleCantidadChange(e, item.id)}
                                                        className="w-16 p-2 border rounded-lg text-center"
                                                    />
                                                </td>
                                                <td>
                                                    <button
                                                        onClick={() => eliminarDelCarrito(item.id)}
                                                        className="text-red-500 hover:text-red-700">
                                                        🗑
                                                    </button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                <section  className='grid place-content-center'>


                    <div className="  m-4 bg-white lg:w-full    h-auto">

                        <div id="total-carrito" className="text-center p-4">

                            <h3 className="text-xl font-bold mb-4 pb-4 pt-2">Total<span className='text-gray-900 text-2xl font-bold'><span className='price text-xl  pl-4'>${total.toFixed(2)}</span></span></h3>

                            <div className='pb-2'>
                                <button className="btn w-3/4  py-2 rounded-lg btn:hover transition mb-4">
                                    Pagar
                                </button>
                            </div>
                            <div className='pb-2'>
                                <button onClick={vaciarCarrito} className="w-3/4 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition">
                                    Vaciar Carrito
                                </button>
                            </div>
                        
                        </div>

                    
                    </div>

                </section>
            </div>
        </div>
    );
}

export default CarritoCompras