const deleteFromCart = async (pid) => {
    try {
      const cid = "65295538c0fbd8486dd71250";
      if (!cid) {
        console.log("cart not found");
      }
      const response = await fetch(
        `http://localhost:8080/api/carts/${cid}/product/${pid}`,
        {
          method: "DELETE",
        }
      );
      if (response.status == 200) {
        const productElement = document.getElementById(`productId-${pid}`);
      console.log('El producto se elimino con exito', productElement)
      }
    } catch (error) {
      console.log("error deleting product from cart: ", error);
    }
  };