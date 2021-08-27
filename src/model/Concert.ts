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

      static stringToConcertDay(input: string): ENUM_DAY {
        switch (input) {
          case "SEXTA":
            return ENUM_DAY.SEXTA;
          case "SÁBADO":
            return ENUM_DAY.SABADO;
          case "SÁBADO":
            return ENUM_DAY.DOMINGO;
          default:
            throw new Error ("Show deverá ocorrer sexta , sábado ou domingo");
        }
      }

 
}


export enum ENUM_DAY{
    SEXTA = "SEXTA",
    SABADO = "SABADO",
    DOMINGO = "DOMINGO"
}

export interface ConcertInputDTO{
    week_day: string;
    start_time: number;
    end_time: number;
    band_id: string;
}
