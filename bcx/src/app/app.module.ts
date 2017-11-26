import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms'; // <-- NgModel lives here


import {AppComponent} from './app.component';
import {BlocksComponent} from './blocks/blocks.component';
import {BlockDetailComponent} from './block-detail/block-detail.component';
import {BlockPreviewComponent} from './block-detail/block-preview.component';

import {BlockServiceTs} from './block.service';
import {MessagesComponent} from './messages/messages.component';
import {MessageService} from './message.service';
import {AppRoutingModule} from './/app-routing.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {TxListComponent} from './tx-list/tx-list.component';

import {TransactionResolver} from './tx-list/transaction.resolver';
import {BlockDetailResolver} from './block-detail/block-detail.resolver';


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
    providers: [BlockServiceTs, MessageService, TransactionResolver, BlockDetailResolver],
    bootstrap: [AppComponent]
})
export class AppModule {}
