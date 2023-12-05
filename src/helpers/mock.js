import { faker } from "@faker-js/faker";

const {database, commerce, string,image, name, internet} = faker;

export const generateProduct = () =>{
    return{
        id: database.mongodbObjectId(),
        title: commerce.product(),
        price: parseFloat(commerce.price()),
        stock: parseInt(string.number(2)),
        image: image.imageUrl(),
        code: string.alphNumberic(5),
        description: commerce.productDescription(),
    }
};

export const generateUser = () =>{
    const numberOfProducts = parseInt(random.number(1));
    let product = [];
    for (let i=0;i<numberOfProducts;i++){
        const newProduct = generateProduct();
        product.push(newProduct);
    };
    return{
        id: database.mongodbObjectId(),
        first_name: name.firstName(),
        last_name: name.lastName(),
        email: internet.email(),
        cart: product

    };
}
