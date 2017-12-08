import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/primeng';


@Component( {
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
} )
export class AppComponent implements OnInit {
    title = 'BCX';

    private items: MenuItem[];

    ngOnInit() {
        this.items = [
            { label: 'Dashboard', icon: 'fa-desktop', routerLink: ['/dashboard'] },
            { label: 'Blocks', icon: 'fa-chain', routerLink: ['/blocks'] },
            { label: 'Table', icon: 'fa-table', routerLink: ['/blockTable'] },
            { label: 'Table 2', icon: 'fa-th-list', routerLink: ['/blockTableSubj'] },
            { label: 'Users', icon: 'fa-user', routerLink: ['/users'] },
            //            {
            //                label: 'File',
            //                items: [{
            //                    label: 'New',
            //                    icon: 'fa-plus',
            //                    items: [
            //                        { label: 'Project' },
            //                        { label: 'Other' },
            //                    ]
            //                },
            //
            //                { label: 'Open', url: 'http://www.primefaces.org/primeng' },
            //                { label: 'Quit' }
            //                ]
            //            },
            //            {
            //                label: 'Edit',
            //                icon: 'fa-edit',
            //                items: [
            //                    { label: 'Undo', icon: 'fa-mail-forward' },
            //                    { label: 'Redo', icon: 'fa-mail-reply' }
            //                ]
            //            }
        ];
    }



}
