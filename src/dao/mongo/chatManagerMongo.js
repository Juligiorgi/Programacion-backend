import { chatModel } from "./Models/chat.model.js";

export class chatManagerMongo{
    constructor(){
        this.model = chatModel;
    }


    async getMessages(){
        try{
            const result = await this.model.find();
            return result;
        }catch (error){
            console.log("getMessages", error.message);
            throw new Error("No se pudo obtener el listado de mensajes");
        }
    };

    async addMessage(messageInfo){
        try{
            const result = await this.model.create(messageInfo);
            return result;
        } catch (error){
            console.log("addMessage", error.message);
            throw new Error ("No se pudo agregar el mensaje");
        }
    };
}