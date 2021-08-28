export class Concert{
    constructor(
        public id: string,
        public week_day: ENUM_DAY,
        public start_time: string,
        public end_time: string,
        public band_id: string
    ){}
    static toConcertModel(concert: any): Concert {
        return new Concert(concert.id, concert.week_day, concert.start_time, concert.end_time, concert.band_id);
      }

      public static stringToConcertDay(input: string): ENUM_DAY {
        switch (input) {
          case "sexta":
            return ENUM_DAY.SEXTA;
          case "sábado":
            return ENUM_DAY.SABADO;
          case "domingo":
            return ENUM_DAY.DOMINGO;
          default:
            throw new Error ("Show deverá ocorrer sexta , sábado ou domingo");
        }
      }

 
}


export enum ENUM_DAY{
    SEXTA = "SEXTA",
    SABADO = "SÁBADO",
    DOMINGO = "DOMINGO"
}

export interface ConcertInputDTO{
    week_day: ENUM_DAY;
    start_time: number;
    end_time: number;
    band_id: string;
}
