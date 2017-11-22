import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here


import { AppComponent } from './app.component';
import { BlocksComponent } from './blocks/blocks.component';
import { BlockDetailComponent } from './block-detail/block-detail.component';
import { BlockPreviewComponent } from './block-detail/block-preview.component';

import {BlockService} from './block.service';
import { MessagesComponent } from './messages/messages.component';
import { MessageService } from './message.service';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TxListComponent } from './tx-list/tx-list.component'

@NgModule({
  declarations: [
    AppComponent,
    BlocksComponent,
    BlockDetailComponent,
    BlockPreviewComponent,
    MessagesComponent,
    DashboardComponent,
    TxListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [BlockService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }