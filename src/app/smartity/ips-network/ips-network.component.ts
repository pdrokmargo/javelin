import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableResource } from 'angular-4-data-table';
import { FormControl } from '@angular/forms';
import { Base } from '../bases/base';

@Component({
    selector: 'ips-network-cmp',
    templateUrl: 'ips-network.component.html',
    styles: []
})

export class IpsNetworkComponent extends Base implements OnInit {

    constructor() {
        super();
    }

    ngOnInit() { }

}
