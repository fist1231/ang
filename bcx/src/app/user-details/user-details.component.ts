import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Location } from '@angular/common';
import { Observable } from "rxjs/Observable";
import { User } from "../users/user";

@Component( {
    selector: 'app-user-details',
    templateUrl: './user-details.component.html',
    styleUrls: ['./user-details.component.css']
} )
export class UserDetailsComponent implements OnInit {

    user$: Observable<User>;

    constructor( private route: ActivatedRoute,
        private location: Location,
        private modalService: BsModalService
    ) { }

    ngOnInit() {
        this.getUser();
    }


    getUser() {
        console.log('getting user info');
        this.user$ = this.route.data.map( x => x.userDetails );
    }

    goBack(): void {
        this.location.back();
    }

}
