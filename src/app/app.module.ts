import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { cardListComponent } from './cardList.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import {ToastModule} from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import {RippleModule} from 'primeng/ripple';
import {PasswordModule} from 'primeng/password';

@NgModule({
  declarations: [
    cardListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TableModule,
    ButtonModule,
    FormsModule,
    TabViewModule,
    ToastModule,
    RippleModule,
    PasswordModule,
    InputTextModule,
    BrowserAnimationsModule
  ],
  bootstrap: [cardListComponent]
})
export class AppModule {
}
