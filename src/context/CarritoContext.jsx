
import React, { createContext, useState, useEffect } from 'react';

export const CarritoContext = createContext();

export const CarritoProvider = ({ children }) => {
    const [carrito, setCarrito] = useState(() => {
        const carritoGuardado = localStorage.getItem('carrito');
        return carritoGuardado ? JSON.parse(carritoGuardado) : [];
    });
    const [cantidad, setCantidad]= useState(0)
    
    

    // Guarda el carrito en localStorage cada vez que se actualice
    useEffect(() => {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }, [carrito]);

    // Función para agregar un producto al carrito
    const agregarAlCarrito = (producto) => {
        const productoExistente = carrito.find(item => item.id === producto.id);
        if (productoExistente) {
            setCarrito(carrito.map(item =>
                item.id === producto.id
                    ? { ...item, cantidad:setCantidad(cantidad + 1) }
                    : item
            ));
        } else {
            setCarrito([...carrito, { ...producto, cantidad: 1 }]);
        }
    };
{console.log("carrito", carrito)}
    const vaciarCarrito = () => {
        
              
                setCarrito([]);
                
                
            }
        
    

    const eliminarDelCarrito = (productoId) => {
   
                setCarrito(carrito.filter(producto => producto.id !== productoId));
              
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