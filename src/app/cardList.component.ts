import { CardsApiCallerService } from './services/cards-api-caller.service';
import { MtgCard } from './utils/MtgCard';
import { Component, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { MessageService, PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './cardList.component.html',
  providers: [MessageService],
  styleUrls: ['./cardList.component.css'],
})
export class cardListComponent {
  title = 'mtgListAngular';
  displayedColumns: string[] = ['id', 'name'];
  cards: MtgCard[] = [];
  loading: boolean = true;
  @ViewChild('dt') dt: Table | undefined;

  cardId: string = '';
  cardSet: string = '';
  cardNumberOwned: string = '';

  constructor(private apiCaller: CardsApiCallerService, private messageService: MessageService, private primengConfig: PrimeNGConfig) {
    this.loadCards();
    this.primengConfig.ripple = true;
  }
  private loadCards() {
    this.apiCaller.getAllCards().subscribe((json) => {
      this.cards = json;
      this.loading = false;
    },
      (err) => {
        this.messageService.add({ severity: 'error', sticky: true, summary: ' error during loading ', detail: 'error when loading page please reload' });
        this.loading = false;
      });
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
      (retval) => {
        this.messageService.add({ severity: 'success', summary: 'Modification of card done', detail: retval.toString() });
        this.loading = true;
        this.loadCards()
      },
      (err) => {
        console.log(err)
        this.messageService.add({ severity: 'error', summary: 'Card was not modified', detail: err.error });
      });
  }

  selectCard(event:any){
    this.messageService.add({ severity: 'warn', summary: 'card selected', detail: event.data.name });
    this.cardId = event.data.id.split('-')[0];
    this.cardSet = event.data.id.split('-')[1];
    this.cardNumberOwned = event.data.numberOwned;
  }
  unselectCard(event:any){
    this.messageService.add({ severity: 'warn', summary: 'card unselected', detail: event.data.name });
    this.cardId = '';
    this.cardSet = '';
    this.cardNumberOwned = '';
  }
}
