import { CardsApiCallerService } from './services/cards-api-caller.service';
import { MtgCard } from './utils/MtgCard';
import { Component, ViewChild } from '@angular/core';
import { Table, TableModule } from 'primeng/table';

@Component({
  selector: 'app-root',
  templateUrl: './cardList.component.html',
  styleUrls: ['./cardList.component.css'],
})
export class cardListComponent {
  title = 'mtgListAngular';
  displayedColumns: string[] = ['id', 'name'];
  cards: MtgCard[] = [];
  loading: boolean = true;
  @ViewChild('dt') dt: Table | undefined;

  constructor(apiCaller: CardsApiCallerService) {
    apiCaller.getAllCards().subscribe((json) => {
      this.cards = json;
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
  applyFilterGlobal($event:any, stringVal: string) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
}
