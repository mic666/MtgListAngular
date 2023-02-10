export class ScryfallCard {
  constructor(
    public cmc: number,
    public color_identity: string,
    public id: string,
    public imgUrl: string,
    public layout: string,
    public mana_cost: string,
    public name: string,
    public card_faces :any,
    public image_uris:any
  ) {
  }
}
