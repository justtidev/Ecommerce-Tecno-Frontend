import React, { useState, useContext, useEffect } from 'react';
/* import { AuthContext } from '../context/AuthContext'; */
import { useNavigate, Link } from 'react-router-dom';
import axios from "axios"

const Login = () => {
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
/*   const { login, token } = useContext(AuthContext); */
 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        email,
        contraseña,
    });
    console.log(response)
    if(response.data.ok) {
      alert( 'Inicio de sesión exitoso');
    
    const rol = response.data.usuario.rol;

    if (rol === 'Usuario') {
      // Redirigir a la página de usuario
      navigate('/')
    } else if (rol === 'Administrador') {
      // Redirigir a la página del administrador
     navigate('/admin/')
    } else {
      // Si el rol no es válido, mostramos un mensaje de error
      alert("error, no autorizado");
    }
  } else {
    alert('Error usuario o contraseña incorrecto');
  }
} catch (error) {
  console.log('Error al iniciar sesión:', error);
 
};
}

 
  return (
 <div className="max-w-md p-5 mx-auto mt-10 bg-white border-gray-500 rounded-xl shadow-md" >
      <h1 className='text-bold text-lg my-8'>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className=" mb-4 ">
          <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">Email</label>

          <input
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
           placeholder="Email"
            id="email"
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}

          />
        </div>
        <div className=" mb-4  ">
          <label className="block mb-2 text-sm font-bold text-gray-700" >Contraseña</label>

          <input
            id="contraseña"
            placeholder="Contraseña"
            type="password"
            name="contraseña"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" />
            </div>

            <div className='flex justify-center'>
          <button className="px-4 py-2 mx-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline" type="submit" >Iniciar sesion</button>
          <button
            className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700 focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => navigate("/")}
          >
            Cancelar
          </button>
        </div>
   
    </form>
    </div>
  );
};

export default Login; 