import { CardsApiCallerService } from './services/cards-api-caller.service';
import { MtgCard } from './utils/MtgCard';
import { Component, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import * as hash from 'hash.js';

@Component({
  selector: 'app-root',
  templateUrl: './cardList.component.html',
  providers: [MessageService],
  styleUrls: ['./cardList.component.css'],
})
export class CardListComponent {
  title = 'mtgListAngular';
  displayedColumns: string[] = ['id', 'name'];

  cards: MtgCard[] = [];

  loading: boolean = true;
  show: boolean = false;
  @ViewChild('dt') dt: Table | undefined;

  cardId: string = '';
  cardSet: string = '';
  cardNumberOwned: string = '';
  password: string = '';

  constructor(private apiCaller: CardsApiCallerService, private messageService: MessageService, private primengConfig: PrimeNGConfig) {
    this.loadCards();
    this.primengConfig.ripple = true;
  }
  private loadCards() {
    this.apiCaller.getAllCards().subscribe(
      {
        next: (json) => this.cards = json,
        error: (e) => this.messageService.add({ severity: 'error', sticky: true, summary: ' error during loading ', detail: 'error when loading page please reload' }),
        complete: () => this.loading = false
      }
    );
  }

  getScryfallUrl(card: MtgCard): string {
    let url: string = 'https://scryfall.com/card/';
    let splittedId = card.id.split('-');
    url += splittedId[1] + '/' + splittedId[0];
    return url;
  }
  clear(table: Table) {
    table.clear();
  }

  applyFilterGlobal($event: any, stringVal: string) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  handleClick() {
    let cardIdForRest = this.cardId + "-" + this.cardSet;
    console.log("Card to modify :" + cardIdForRest + " / " + this.cardNumberOwned)
    this.apiCaller.updateCard(cardIdForRest, this.cardNumberOwned).subscribe(
      {
        next: (retval) => {
          this.messageService.add({ severity: 'success', summary: 'Modification of card done', detail: retval.toString() });
          this.loading = true;
        },
        error: (e) => {
          console.log(e)
          this.messageService.add({ severity: 'error', summary: 'Card was not modified', detail: e.error });
        },
        complete: () => this.loadCards()
      }
    );
  }

  handleAddClick() {
    let cardIdForRest = this.cardId + "-" + this.cardSet;
    this.apiCaller.getCardFromScryfall(this.cardId, this.cardSet, this.cardNumberOwned).subscribe(
      {
        next: (v) => {
          console.log('Do get card from scryfall :' + v.name)
          this.apiCaller.addCard(v, this.cardNumberOwned, cardIdForRest).subscribe({
            next: (v) => this.messageService.add({ severity: 'success', summary: 'card added with success', detail: v.toString() }),
            error: (e) => this.messageService.add({ severity: 'error', summary: 'Card was not added', detail: 'error when trying to add the card' + e.error }),
            complete: () => { this.loadCards() },
          })
        },
        error: (e) => this.messageService.add({ severity: 'error', summary: 'Card was not added', detail: 'error when calling scryfall' }),
        complete: () => { },
      })
  }

  selectCard(event: any) {
    this.messageService.add({ severity: 'warn', summary: 'card selected', detail: event.data.name });
    this.cardId = event.data.id.split('-')[0];
    this.cardSet = event.data.id.split('-')[1];
    this.cardNumberOwned = event.data.numberOwned;
  }
  unselectCard(event: any) {
    this.messageService.add({ severity: 'warn', summary: 'card unselected', detail: event.data.name });
    this.cardId = '';
    this.cardSet = '';
    this.cardNumberOwned = '';
  }
  handlePassword() {
    let passHash = 'e9507c51897da384d92d3d942e05998b71748ce358f006eef11e25942cd2fea4';//save this outside of code when using real password ^^'
    let userPassHash = hash.sha256().update(this.password).digest('hex');
    this.show = (userPassHash == passHash);
    if (!this.show) {
      this.messageService.add({ severity: 'error', summary: 'Login failure', detail: 'Incorrect password please retry' });
    }
  }
}
