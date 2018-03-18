import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableResource } from 'angular-4-data-table';
import { FormControl } from '@angular/forms';
import { Base } from '../bases/base';

@Component({
    selector: 'pharmaceutical-drug-cmp',
    templateUrl: 'pharmaceutical-drug.component.html',
    styles: []
})

export class PharmaceuticalDrugComponent extends Base implements OnInit {

    constructor() {
        super();
    }

    ngOnInit() {  }

}
