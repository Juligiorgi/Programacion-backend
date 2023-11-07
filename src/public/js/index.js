const addToCart = async (pid) => {
   
    let cid = "65295538c0fbd8486dd71250";
    if (!cid) {
      console.log("EL CARRITO NO EXISTE");
      return; }
    
      const response = await fetch(
      `http://localhost:8080/api/carts/${cid}/product/${pid}`,
      {
        method: "PUT",
      });

    if (response.status == 200) {
        const cart= ({cid,pid})
        console.log('Producto agregado al carrito:', cart);
     
     }else{
        console.error('No se pudo agregar al carrito');
     }
  
};