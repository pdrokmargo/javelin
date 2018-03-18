import { Component, OnInit, ViewChild } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Base } from '../bases/base';

@Component({
    selector: 'users-cmp',
    templateUrl: 'users.component.html',
    styles: []
})

export class UsersComponent extends Base implements  OnInit{

    constructor() {
        super();
    }

    ngOnInit() { }

}
