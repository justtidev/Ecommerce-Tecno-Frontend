

/*

{"data":[
{"id":1,"nombre":"Ana","apellido":"Diaz","email":"ana@gmail.com","contraseña":"Ana12","rol":"cliente"

*/


function Listado(props) {

    const { usuarios } = props;
  
    return (
      <div className="p-5">
        <div className=' *: font-bold   text-center p-6'>
          Listado de usuarios
        </div>
  
        <div className=" grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-5 " >
          {usuarios.map((usuario, index) =>
            <div key={index} className="bg-gray-200  mb-1  md:mb-4 p-2 rounded-md " >
              <div> {usuario.id}</div>
              {/* <div> <img src={producto.image} alt="..." className="w-24" /> </div> */}
              <div> {usuario.nombre}</div>
            </div>
          )}
        </div>
  
      </div>
    )
  }
  
  export default Listado