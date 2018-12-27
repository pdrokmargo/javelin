import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableResource } from 'angular-4-data-table';
import { FormControl } from '@angular/forms';
import { Base } from '../bases/base';

@Component({
    selector: 'stakeholders-cmp',
    templateUrl: 'stakeholders.component.html',
    styles: []
})

export class StakeholdersComponent extends Base implements OnInit {


    constructor() {
        super();
    }

    ngOnInit() {}

}
