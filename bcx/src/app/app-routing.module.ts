import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BlocksComponent} from './blocks/blocks.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {BlockDetailComponent} from './block-detail/block-detail.component';
import {TxListComponent} from './tx-list/tx-list.component';
import {TransactionResolver} from './tx-list/transaction.resolver';
import {BlockDetailResolver} from './block-detail/block-detail.resolver';
import {BlockTableComponent} from './block-table/block-table.component';
import {BlockTableSubjComponent} from './block-table-subj/block-table-subj.component';


const routes: Routes = [
    {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    {path: 'blocks', component: BlocksComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'transactions/:account', component: TxListComponent},
    //    {
    //        path: 'transactions/:account',
    //        component: TxListComponent,
    //        resolve: {
    //            transaction: TransactionResolver
    //        }
    //    },
    //    {path: 'detail/:id', component: BlockDetailComponent}
    {
        path: 'detail/:id',
        component: BlockDetailComponent,
        resolve: {
            blockDetail: BlockDetailResolver

        }
    },
    {path: 'blockTable', component: BlockTableComponent},
    {path: 'blockTableSubj', component: BlockTableSubjComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {


}
