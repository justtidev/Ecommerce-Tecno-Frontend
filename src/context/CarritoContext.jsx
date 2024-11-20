
import React, { createContext, useState, useEffect } from 'react';


export const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
    const [carrito, setCarrito] = useState(() => {
        const carritoGuardado = localStorage.getItem('carrito');
        return carritoGuardado ? JSON.parse(carritoGuardado) : [];
    });

    // Guarda el carrito en localStorage cada vez que se actualice
    useEffect(() => {
        localStorage.setItem('carrito', JSON.stringify(carrito));
        console.log(carrito)
    }, [carrito]);

    // Función para agregar un producto al carrito
    const agregarAlCarrito = (producto) => {
        const productoExistente = carrito.find(item => item.id === producto.id);
        console.log('agregaralcarrito', carrito);
       alert("Producto Agregado") 
       
        
        if (productoExistente) {
            setCarrito(carrito.map(item =>
                item.id === producto.id
                    ? { ...item, cantidad: item.cantidad + 1 }
                    : item
            ));
        } else {
            setCarrito([...carrito, { ...producto, cantidad: 1 }]);
        }
    };

    const vaciarCarrito = () => {
        alert('Eliminar productos?')
        
                // Vaciar el carrito si el usuario confirma
                setCarrito([]);
               ;
            }
        
    

    const eliminarDelCarrito = (id) => {
        alert('Eliminar del Carrito?')
                // Eliminar el producto si el usuario confirma
                setCarrito(carrito.filter(producto => producto.id !== id));
              
            }
     

    // Función para actualizar la cantidad de un producto en el carrito
    const actualizarCantidad = (id, cantidad) => {
        setCarrito(carrito.map(item =>
            item.id === id
                ? { ...item, cantidad: parseInt(cantidad, 10) }
                : item
        ));
    };

    return (
        <CarritoContext.Provider value={{ carrito, agregarAlCarrito, vaciarCarrito, eliminarDelCarrito, actualizarCantidad }}>
            {children}
        </CarritoContext.Provider>
    );
};