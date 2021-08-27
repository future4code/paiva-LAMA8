export class Band{
    constructor(
    public id: string,
    public name: string,
    public music_genre: string,
    public responsible: string
    ){}

   
    static toBandModel(band: any): Band {
        return new Band(band.id, band.name, band.music_genre, band.responsible);
      }

      
    }


export interface BandInputDTO{
    name: string;
    music_genre: string;
    responsible: string
}







export class BandOutPut{
    constructor(
    public name: string,
    public music_genre: string,
    ){}


static toBandOutPutModel(band: any): BandOutPut {
    return new BandOutPut( band.name, band.music_genre);
  }
}
export interface BandOutPut{
    name: string,
    music_gender: string

}