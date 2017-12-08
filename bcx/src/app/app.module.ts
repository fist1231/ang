import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BlocksComponent } from './blocks/blocks.component';
import { BlockDetailComponent } from './block-detail/block-detail.component';
import { BlockPreviewComponent } from './block-detail/block-preview.component';

import { BlockServiceTs } from './block.service';
import { MessagesComponent } from './messages/messages.component';
import { MessageService } from './message.service';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TxListComponent } from './tx-list/tx-list.component';

import { TransactionResolver } from './tx-list/transaction.resolver';
import { BlockDetailResolver } from './block-detail/block-detail.resolver';
import { BlockTableComponent } from './block-table/block-table.component';

import { DataTablesModule } from 'angular-datatables';


//import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BlockTableSubjComponent } from './block-table-subj/block-table-subj.component';
import { UsersComponent } from './users/users.component';
import { UsersResolver } from './users/users.resolver';
import { UsersService } from './users.service';
import { UserDetailsComponent } from './user-details/user-details.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UserDetailsResolver } from './user-details/user-details.resolver';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ReactiveFormsModule } from '@angular/forms'; 

import { DialogModule } from 'primeng/primeng';
import { ButtonModule } from 'primeng/primeng';
import { MenubarModule } from 'primeng/primeng';
import {DataTableModule,SharedModule} from 'primeng/primeng';
import {ContextMenuModule} from 'primeng/primeng';
import {DropdownModule} from 'primeng/primeng';
import {CalendarModule} from 'primeng/primeng';


@NgModule( {
    declarations: [
        AppComponent,
        BlocksComponent,
        BlockDetailComponent,
        BlockPreviewComponent,
        MessagesComponent,
        DashboardComponent,
        TxListComponent,
        BlockTableComponent,
        BlockTableSubjComponent,
        UsersComponent,
        UserDetailsComponent,
        AddUserComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        //        BsDropdownModule.forRoot(),
        TooltipModule.forRoot(),
        ModalModule.forRoot(),
        NgbModule.forRoot(),
        DataTablesModule.forRoot(),
        HttpClientModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        DialogModule, ButtonModule, MenubarModule, DataTableModule, ContextMenuModule, DropdownModule, CalendarModule 
    ],
    providers: [BlockServiceTs, MessageService, TransactionResolver, BlockDetailResolver, UsersResolver, UsersService, UserDetailsResolver],
    bootstrap: [AppComponent],
    //    exports: [BsDropdownModule, TooltipModule, ModalModule]
} )
export class AppModule { }
