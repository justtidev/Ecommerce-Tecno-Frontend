import React, { useContext } from 'react';
import { CarritoContext } from '../context/CarritoContext';

function Carrito(){
    const { carrito, vaciarCarrito, eliminarDelCarrito, actualizarCantidad } = useContext(CarritoContext);
    
    return(
        <>
        {carrito.lenght ? (
            <>
                <div className='row-product'>
                    {carrito.map(product => (
                        <div className='cart-product' key={product.id}>
                            <div className='info-cart-product'>
                                <span className='cantidad-producto-carrito'>
                                    {product.cantidad}
                                </span>
                                <p className='titulo-producto-carrito'>
                                    {product.nombre}
                                </p>
                                <span className='precio-producto-carrito'>
                                    ${product.precioUnitario}
                                </span>
                            </div>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth='1.5'
                                stroke='currentColor'
                                className='icon-close'
                                onClick={() => onDeleteProduct(product)}
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M6 18L18 6M6 6l12 12'
                                />
                            </svg>
                        </div>
                    ))}
                </div>

                <div className='cart-total'>
                    <h3>Total:</h3>
                    <span className='total-pagar'>${total}</span>
                </div>

                <button className='btn-clear-all' onClick={onCleanCart}>
                    Vaciar Carrito
                </button>
            </>
        ) : (
            <p className='cart-empty'>El carrito está vacío</p>
        )}
        </>
    )
}
export default Carrito;

 

/* function Carrito() {
    const { carrito, vaciarCarrito, eliminarDelCarrito, actualizarCantidad } = useContext(CarritoContext);

    const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

    const handleCantidadChange = (e, producto_id) => {
        const cantidad = parseInt(e.target.value, 10);
        if (cantidad >= 1) {
            actualizarCantidad(producto_id, cantidad);
        }
    };

    return (
        <div className="carritoContainer">
            <h3 className="text-center pt-20 text-3xl  font-bold">Carrito de Compras</h3>
            <div className="flex flex-wrap p-4 lg:h-auto h-auto">
                
                <div className="w-full  lg:w-3/5 mt-10 ml-5 p-5">
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {carrito.map((item, i) => (
                            <li className="bg-white p-4 border border-gray-200 rounded-lg shadow-sm" key={i}>
                                <div>
                                    <table className="table-auto w-full">
                                        <thead>
                                            <tr className="text-left">
                                                <th></th>
                                                <th className="pl-4">Producto</th>
                                                <th className="pl-8">Precio</th>
                                                <th className="pl-4">Cantidad</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                               
                                                <td><img className="w-20 h-auto object-cover max-w-full" src={item.imagen} alt={item.nombre} /></td>

                                                <td className="pl-4">{item.nombre}</td>
                                                <td className="pl-8">${item.precio}</td>
                                                <td className="pl-4">
                                                    <input
                                                        type="number"
                                                        value={item.cantidad}
                                                        min="1"
                                                        onChange={(e) => handleCantidadChange(e, item.producto_id)}
                                                        className="w-16 p-2 border rounded-lg text-center"
                                                    />
                                                </td>
                                                <td>
                                                    <button
                                                        onClick={() => eliminarDelCarrito(item.producto_id)}
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

                <section className='contenedor-pagar'>


                    <div className="m-14  bg-white lg:w-full p-5  rounded-lg shadow-lg h-auto">

                        <div id="total-carrito" className="text-center p-1">

                            <h3 className="text-2xl font-bold mb-4 pb-4 pt-2">Total<span className='text-gray-900 text-2xl font-bold'><span className='text-xl italic pl-4'>${total.toFixed(2)}</span></span></h3>

                            <div className='pb-2'>
                                <button className="w-3/4 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition mb-4">
                                    Pagar
                                </button>
                            </div>
                            <div className='pb-2'>
                                <button onClick={vaciarCarrito} className="w-3/4 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition">
                                    Vaciar Carrito
                                </button>
                            </div>
                        </div>

                        <a href="http://localhost:5173/productos" className="text-red-950 hover:text-red-600 mt-4 block text-center">
                            Continuar comprando
                        </a>
                    </div>

                </section>
            </div>
        </div>
    );
}

export default Carrito; */