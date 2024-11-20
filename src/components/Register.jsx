import React, { useState, useContext } from 'react';
/* import { AuthContext } from '../context/AuthContext'; */
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const Register = () => {
  const [nombre, setNombre] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [rol, setRol] = useState('');
  /*   const { register } = useContext(AuthContext); */
  const navigate = useNavigate();

  //Register
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/auth/register', {
        nombre, apellido, email, contraseña, rol,
        
      });
      console.log(response.data)

      if (response.data.ok) {
        console.log("Usuario registrado");
        navigate('/login');
      }
    } catch (error) {
      console.error('Error de registro:', error);
      alert(error.response.data.message)

    }
  };

  return (



    <div className="max-w-md p-5 mx-auto mt-10 bg-white rounded-lg shadow-md" >
      <h1 className='text-bold text-lg my-8'>Registrarse</h1>
      <form onSubmit={handleSubmit}>
        <div className=" mb-4 ">
          <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="nombre">Nombre</label>

          <input
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            id="nombre"
            type="text"
            name="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}

          />
        </div>
        <div className=" mb-4  ">
          <label className="block mb-2 text-sm font-bold text-gray-700" > Apellido</label>

          <input
            id="apellido"
            type="text"
            name="apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" />

        </div>
        <div className="block mb-2 text-sm font-bold text-gray-700">
          <label className="p-3">Email</label>

          <input
            id="email"
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" />

        </div>

        <div className="block mb-2 text-sm font-bold text-gray-700">
          <label className="p-3">Contraseña</label>

          <input
            id="contraseña"
            type="password"
            name="contraseña"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" />


        </div>

        <div className="block mb-2 text-sm font-bold text-gray-700">
          <label className="p-3">Rol</label>

          <input
            id="rol "
            type="text"
            name="rol"
            value={rol}
            onChange={(e) => setRol(e.target.value)}
            className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" />
        </div>


        <div className='flex justify-center'>
          <button className="px-4 py-2 mx-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline" type="submit" >Guardar</button>
          <button
            className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700 focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => navigate('/admin/usuario')}
          >
            Cancelar
          </button>
        </div>
      </form >
  </div>
  )} 




export default Register;
