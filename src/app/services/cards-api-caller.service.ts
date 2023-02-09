import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { MtgCard } from '../utils/MtgCard';

@Injectable({ providedIn: 'root' })
export class CardsApiCallerService {
  private serverApi = 'http://mic66688.synology.me:8080/';
  constructor(private cardsRestApi: HttpClient) { }

  getAllCards() {
    let apiParams = new HttpParams().set('format', 'json');
    return this.cardsRestApi
      .get<MtgCard[]>(this.serverApi + 'cards', {
        observe: 'body',
        responseType: 'json',
        params: apiParams,
      })
      .pipe(take(1));
  }

  updateCard(cardId: string, numberOwned: string) {
    let apiParams = new HttpParams().set('numberOwned', numberOwned);
    console.log(apiParams.get('numberOwned'))
    return this.cardsRestApi.put(this.serverApi + 'card/' + cardId, {},
      { responseType: 'text',params: apiParams }).pipe(take(1))
  }
}

