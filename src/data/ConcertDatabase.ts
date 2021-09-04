import { Concert, ENUM_DAY } from "../model/Concert";
import { BaseDatabase } from "./BaseDatabase";

export class ConcertDatabase extends BaseDatabase {
   
    private static TABLE_NAME = "lama_concert";

    public async createConcert(
        id: string,
        week_day: string,
        start_time:number,
        end_time: number,
        band_id: string
        ):Promise<void>{

            try{
                await this.getConnection()
                .insert({
                  id,
                  week_day,
                  start_time,
                  end_time,
                  band_id})
                  .into(ConcertDatabase.TABLE_NAME)

            }catch(error){
                throw new Error(error.sqlMessage || error.message);
            }
        }
    
      async getConcertByDayData(day: ENUM_DAY):Promise<any>{
            try{
   
                const result = await this.getConnection()
                .from("lama_band")
                .select("lama_band.name", "lama_band.music_genre")               
                .where("lama_concert.week_day", "=", day)
                .join("lama_concert","band_id","=", "lama_band.id")
                .orderBy("start_time", "ASC")    
       
                return result
               
            }catch(error){
                throw new Error(error.sqlMessage || error.message);
            }
        }
        async checkTime(
            week_day:ENUM_DAY,
            start_time: number,
            end_time: number
        ):Promise<Concert>{
            try{
            const result = await this.getConnection()
            .select("*")
            .from(ConcertDatabase.TABLE_NAME)
            .where({week_day, start_time, end_time})

            return result[0]
        }catch(error){
        throw new Error(error.sqlMessage || error.message);
    }
}
}