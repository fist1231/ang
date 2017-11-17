import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlocksComponent } from './blocks/blocks.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { BlockDetailComponent }  from './block-detail/block-detail.component';


const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'blocks', component: BlocksComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'detail/:id', component: BlockDetailComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule {


}
