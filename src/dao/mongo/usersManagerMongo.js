import { usersModel } from "./Models/users.model.js";

export class UsersManagerMongo {
  constructor() {
    this.model = usersModel;
  }

  
  async addUser(userInfo) {
    try {
      const result = await this.model.create(userInfo);
      if (
        userInfo.email == "adminCoder@coder.com" &&
        userInfo.password == "adminCod3r123"
      ) {
        userInfo.role = "admin";
      } else {
        userInfo.role = "user";
      }
      return result;
    } catch (error) {
      console.log(`add user error: ${error.message}`);
      throw new Error(`add user error: ${error.message}`);
    }
  }

 
  async getUser(loginForm) {
    try {
      const result = await this.model.findOne({ email: loginForm.email });
      return result;
    } catch (error) {
      console.log(`get user error: ${error.message}`);
      throw new Error(`get user error: ${error.message}`);
    }
  }

  async updateUser(id,user){
    try {
      const result = await this.model.findByIdAndUpdate(id,user,{new:true});
      return result;
    } catch (error) {
      console.log("updateUser: ", error.message);
      throw new Error("Se produjo un error actualizando el usuario");
    }
  }
}