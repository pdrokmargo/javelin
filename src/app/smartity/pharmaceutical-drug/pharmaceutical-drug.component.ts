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


    json: any = [
        {
            factura: 'SIM-520712',
            cantidad: 30,
            unitario: 250000,
            total: 893000,
            fecha: '20 de junio de 2020'
        },
        {
            factura: 'SIM-234232',
            cantidad: 60,
            unitario: 250000,
            total: 893000,
            fecha: '08 de junio de 2020'
        },
        {
            factura: 'SIM-78678',
            cantidad: 90,
            unitario: 289000,
            total: 913000,
            fecha: '14 de junio de 2020'
        }
    ]

    constructor() {
        super();
    }

    ngOnInit() { }


    buscar() {
        console.log("Buscando" + this.fecha);
    }


    randon() {
        return Math.random();
    }

}
