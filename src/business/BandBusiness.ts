import { BandDatabase } from "../data/BandDatabase";
import { BandInputDTO } from "../model/Band";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

        const bandDatabase = new BandDatabase();
        const authenticator = new Authenticator();

export class BandBusiness{

    async create(input:BandInputDTO, token:string){
       
        const tokenResult = authenticator.getData(token)
        
        if(!tokenResult){
            throw new Error("token inválido")
        }
        if(tokenResult.role === "NORMAL"){
            throw new Error("Somente administradores podem registrar bandas")
        }
 
        const idGenerator = new IdGenerator();
        const id = idGenerator.generate();

        await bandDatabase.createBand(id,input.name, input.music_genre, input.responsible);
    }
 
    async getBandById(id:string, token:string){

        const tokenResult = authenticator.getData(token)
        if(!tokenResult){
            throw new Error("token inválido")
        }
        
        const Result = bandDatabase.getBandByIdData(id)
        return Result
    }

}
    