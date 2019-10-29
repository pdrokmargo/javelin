import { Component, OnInit } from '@angular/core';
import { HelperService } from "../../shared";
import { filter } from 'rxjs/operators';

@Component({
    selector: 'dashboard-cmp',
    template: ``
})

export class DashboardComponent implements  OnInit {
    constructor(private helperService: HelperService) { }
    ngOnInit() {
        // this.helperService.GET(`/api/sync`).subscribe(rs => {
        //     let res = rs.json();
        //   }, err => { });
    }
}
