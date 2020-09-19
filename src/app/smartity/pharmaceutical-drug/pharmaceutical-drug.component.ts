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

    nit: string = '802024817';
    token: string = '_0hZFuEPhyPIbwAowjiePUTIloS1mZxpHuGdPm3BJBc=';
    prescripcion: string = '20200722124021108455';
    fecha: string = null;

    constructor() {
        super();
    }

    ngOnInit() { }


    buscar() {
        console.log("Buscando" + this.fecha);
    }

}
