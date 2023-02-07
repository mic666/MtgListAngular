import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { MtgCard } from '../utils/MtgCard';

@Injectable({ providedIn: 'root' })
export class CardsApiCallerService {
  private serverApi = 'http://mic66688.synology.me:8080/cards';
  constructor(private cardsRestApi: HttpClient) {}
  getAllCards() {
    const apiParams = new HttpParams().set('format', 'json');
    return this.cardsRestApi
      .get<MtgCard[]>(this.serverApi, {
        observe: 'body',
        responseType: 'json',
        params: apiParams,
      })
      .pipe(take(1));
  }
}

