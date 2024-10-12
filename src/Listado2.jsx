

/*
{
    "ok": true,
    "msg": "Listado de productos",
    "status": 200,
    "data": [
        {
            "id": 3,
            "nombre": "Notebook Gfast 15,6” ",
            "descripcionBreve": "Intel Celeron 4GB 120GB SSD N-150-W i4120W",
            "precioUnitario": "300000.00",
            "stock": 50,
            "descripcionDetallada": "Intel Celeron 4GB 120GB SSD N-150-W i4120W",
            "costoProducto": "100000.00",
            "createdAt": "2024-08-23T23:15:34.000Z",
            "updatedAt": "2024-09-24T21:23:49.000Z",
            "CategoriumId": 2,
            "Imagens": [
                {
                    "id": 1,
                    "ubicacion": "https://p1-ofp.static.pub//medias/26050595576_LOQ15IRX9WHBKLTLunaGreyIMG_202309261024281711014451866.png",
                    "nroDeOrden": 1,
                    "createdAt": "2024-08-24T00:00:20.000Z",
                    "updatedAt": "2024-09-24T16:12:10.000Z",
                    "ProductoId": 3
                },
                {
                    "id": 28,
                    "ubicacion": "https://p3-ofp.static.pub//fes/cms/2024/05/20/vr1ibpj08p4hes6j5zym7gd2q4yyk9886452.png",
                    "nroDeOrden": 2,
                    "createdAt": "2024-09-24T20:11:22.000Z",
                    "updatedAt": "2024-09-24T20:12:55.000Z",
                    "ProductoId": 3
                },
                {
                    "id": 29,
                    "ubicacion": "https://p3-ofp.static.pub//fes/cms/2024/05/20/hh4x4fa0iac2wufaqqe3ys8blgvohj649076.png",
                    "nroDeOrden": 3,
                    "createdAt": "2024-09-24T20:14:11.000Z",
                    "updatedAt": "2024-09-24T20:14:11.000Z",
                    "ProductoId": 3
                }
            ]
        },
        {
            "id": 4,
            "nombre": "Notebook Hp Intel I3-n305",
            "descripcionBreve": "8gb 256gb 14'' Hd Win11 Azul Claro",
            "precioUnitario": "400000.00",
            "stock": 100,
            "descripcionDetallada": "8gb 256gb 14'' Hd Win11 Azul Claro",
            "costoProducto": "200000.00",
            "createdAt": "2024-09-07T00:34:36.000Z",
            "updatedAt": "2024-09-24T21:24:44.000Z",
            "CategoriumId": 2,
            "Imagens": []
        },
        {
            "id": 6,
            "nombre": "Tablet Philco Tp7a464 7''",
            "descripcionBreve": "64gb 4gb Android Negro",
            "precioUnitario": "389000.99",
            "stock": 20,
            "descripcionDetallada": "64gb 4gb Android Negro",
            "costoProducto": "200000.00",
            "createdAt": "2024-09-07T00:41:03.000Z",
            "updatedAt": "2024-09-24T21:25:54.000Z",
            "CategoriumId": 4,
            "Imagens": []
        },
        {
            "id": 8,
            "nombre": "Ratón inalámbrico",
            "descripcionBreve": "recargable, inalámbrico, óptico, LED RGB, negro",
            "precioUnitario": "13000.00",
            "stock": 20,
            "descripcionDetallada": "recargable, inalámbrico, óptico, LED RGB, negro",
            "costoProducto": "8000.00",
            "createdAt": "2024-09-24T21:26:57.000Z",
            "updatedAt": "2024-09-24T21:26:57.000Z",
            "CategoriumId": 6,
            "Imagens": []
        },
        {
            "id": 9,
            "nombre": "Teclado gamer Redragon Kumara K552",
            "descripcionBreve": "QWERTY Outemu Red español latinoamérica color negro con luz RGB",
            "precioUnitario": "75000.00",
            "stock": 100,
            "descripcionDetallada": "QWERTY Outemu Red español latinoamérica color negro con luz RGB",
            "costoProducto": "50000.00",
            "createdAt": "2024-09-24T21:28:08.000Z",
            "updatedAt": "2024-09-24T21:28:08.000Z",
            "CategoriumId": 6,
            "Imagens": []
        },
        {
            "id": 10,
            "nombre": "Monitor Dahua 22 Full Hd",
            "descripcionBreve": "1080p 75hz Led Hdmi Color Negro",
            "precioUnitario": "196000.00",
            "stock": 40,
            "descripcionDetallada": "1080p 75hz Led Hdmi Color Negro",
            "costoProducto": "9999.00",
            "createdAt": "2024-09-24T21:29:20.000Z",
            "updatedAt": "2024-09-24T21:29:20.000Z",
            "CategoriumId": 3,
            "Imagens": []
        }
    ]
}

*/



function Listado2(props) {

  const { productos } = props;


//  const imagenes = productos[0].Imagens[0].ubicacion
  //console.log(imagenes)


  return (
<>
    <div  >
   

      <div className="" >
        {productos.map((producto, index) =>


          <div key={index} className=" my-4 items-center  relative group bg-white border rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105" >



             {/* <div>  <img src={} alt=".." classNameName="" /> </div>  */}
            <div><img className="w-full  bg-gray-200 flex items-center gap-2 my-4 overflow-hidden" src={(productos[index].Imagens[0].ubicacion)} /> </div> 
           <div> </div>
            
            <div className='text-black text-2xl'> {producto.nombre}</div>
            <div className="">  {producto.descripcionBreve}</div>
            <div className="text-black text-2xl "> $ {producto.precioUnitario}</div>
            <button className="bg-green-600 hover:bg-green-400 my-2 text-md text-gray-900 rounded-lg p-2 ">Agregar al carrito</button>
               <div><a  className="m-2 underline " href="Mas detalles">Mas detalles</a></div> 
          </div>,

        )}
      </div>
      </div>
      </>
      )}

export default Listado2;


