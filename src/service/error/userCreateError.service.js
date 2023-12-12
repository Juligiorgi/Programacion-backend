export const userCreateError = (user)=>{
    return`
      Todos los campos son obligatorios,
      Campos obligatorios:
      name: Este es de tipo string y se recibio ${user.name},
      lastname: Este es de tipo string y se recibio ${user.lastname},
      email: Este es de tipo string y se recibio ${user.email},
      Campos opcionales:
      age: Este es de tipo numerico y se recibio ${user.age},
    `
}