import { Band } from "../model/Band";
import { BaseDatabase } from "./BaseDatabase";

export class BandDatabase extends BaseDatabase {

  private static TABLE_NAME = "lama_band";

  public async createBand( id:string, name:string, music_genre:string, responsible:string): Promise<void> {
    try {
        await this.getConnection()
        .insert({
         id,
         name,
         music_genre,
         responsible
        })
        .into(BandDatabase.TABLE_NAME);

    }catch(error){
        throw new Error(error.sqlMessage || error.message);
    }
}

async getBandByIdData(id:string):Promise<Band>{

        const result = await this.getConnection()
        .select("*")
        .from(BandDatabase.TABLE_NAME)
        .where({id})
        
        return Band.toBandModel(result[0]);
    
}
}