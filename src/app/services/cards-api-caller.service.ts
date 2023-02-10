import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { MtgCard } from '../utils/MtgCard';
import { ScryfallCard } from '../utils/ScryfallCard';

@Injectable({ providedIn: 'root' })
export class CardsApiCallerService {
  private serverUrl = 'http://mic66688.synology.me:8080/';
  private localHostUrl = 'http://192.168.50.141:8080/';
  private scryfallUrl = 'https://api.scryfall.com/cards/';
  private specialLayout: Array<string> = ['transform', 'modal_dfc']
  constructor(private apiCaller: HttpClient) { }

  getAllCards() {
    let apiParams = new HttpParams().set('format', 'json');
    return this.apiCaller
      .get<MtgCard[]>(this.serverUrl + 'cards', {
        observe: 'body',
        responseType: 'json',
        params: apiParams,
      })
      .pipe(take(1));
  }

  updateCard(cardId: string, numberOwned: string) {
    let apiParams = new HttpParams().set('numberOwned', numberOwned);
    console.log(apiParams.get('numberOwned'))
    console.log(apiParams.get('numberOwned'))
    return this.apiCaller.put(this.serverUrl + 'card/' + cardId, {},
      { responseType: 'text', params: apiParams }).pipe(take(1))
  }

  getCardFromScryfall(cardId: string, cardSet: string, numberOwned: string) {
    return this.apiCaller.get<ScryfallCard>(this.scryfallUrl + cardSet + '/' + cardId)
      .pipe(
        take(1)
      )
  }
  addCard(scryfallCard: ScryfallCard, numberOwned: string, cardIdForRest: string) {
    let apiParams = new HttpParams();
    if (this.specialLayout.indexOf(scryfallCard.layout) == -1) {
      apiParams = apiParams
        .set('id', cardIdForRest)
        .set('numberOwned', numberOwned)
        .set('name', scryfallCard.name)
        .set('manaCost', scryfallCard.mana_cost)
        .set('cmc', scryfallCard.cmc)
        .set('colorIdentity', scryfallCard.color_identity)
        .set('layout', scryfallCard.layout)
        .set('imgUrl', scryfallCard.image_uris['small']!.toString());
    } else {
      apiParams = apiParams
        .set('id', cardIdForRest)
        .set('numberOwned', numberOwned)
        .set('name', scryfallCard.name)
        .set('manaCost', scryfallCard.card_faces[0].mana_cost)
        .set('cmc', scryfallCard.cmc)
        .set('colorIdentity', scryfallCard.color_identity)
        .set('layout', scryfallCard.layout)
        .set('imgUrl', scryfallCard.card_faces[0].image_uris['small']!.toString());
    }

    return this.apiCaller.post(this.serverUrl + 'card', {}, { responseType: 'text', params: apiParams }).pipe(take(1));
  }
}

