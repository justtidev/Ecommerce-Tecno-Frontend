

export default function Cupones({cupon, setCupon}){
    
    return (
  

        
            <div className=" w-full  grid justify-self-center m-4 place-content-center text-center">
          <h3 className='m-4'>CÓDIGO PROMOCIONAL </h3>
          <p className='text-gray-500  '>Si dispones de un código promocional introducelo a continuacion para poder acceder a las explusivas ofertas con el descuento correspondiente. </p>
      

          <div>
          <label htmlFor="Search" className="sr-only"> </label>
          <input
          
            type="text"
            placeholder= "Ingresar Cupon "
            className="  mx-4 mt-6 w-40  text-md rounded-md text-gray-600 border-2 border-gray-200 shadow-md focus:outline-none focus:ring-gray-600 focus:border-gray-800 p-2   sm:text-md sm:w-auto"
            value={cupon}
            onChange={(e) => setCupon(e.target.value)} />
           {/* <span className="absolute inset-y-0 end-0 grid place-content-center" > */}
         
            <button type="button" className="bg-green-600 hover:bg-green-400 my-2 text-md text-gray-900 rounded-lg mt-8 p-2 ">
              Aplicar
            </button>
            </div>
          {/* </span> */}
        </div>
       
    )
}