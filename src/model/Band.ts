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