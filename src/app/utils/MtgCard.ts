export class MtgCard {
  constructor(
    public cmc: number,
    public colorIdentity: string,
    public id: string,
    public imgUrl: string,
    public layout: string,
    public manaCost: string,
    public name: string,
    public numberOwned: number,
  ) {
  }
}
