export class Band{
    constructor(
    private id: string,
    private name: string,
    private music_genre: string,
    private responsible: string
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