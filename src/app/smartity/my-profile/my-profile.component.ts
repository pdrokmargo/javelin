import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../auth/authentication.service';
import { LrvTable, LrvTableColumn, LrvTableService, LrvTableOrder } from '../lrv-data-table/lrv-table';
import { MatSnackBar } from '@angular/material';
import { LoaderService, HelperService } from '../../shared';
import { Response } from '@angular/http';

@Component({
    selector: 'my-profile-cmp',
    templateUrl: './my-profile.component.html',
    styles: []
})
export class MyProfileComponent implements OnInit {

    private formActive = 'form';
    private model: any= {};

    private pass = {
        password1: '',
        password2: ''
    };
    private password: any = { confirm: '' };

    constructor(private loaderService: LoaderService,
                private helperService: HelperService,
                public snackBar: MatSnackBar) {

    }

    ngOnInit() {
        this.loaderService.display(true);
        this.helperService.GET(`/api/profile`)
        .map((response: Response) => {

            const res = response.json();
            this.model = res['data'];

        }).subscribe(
        (error) => {
            this.loaderService.display(false);
        },
        (done) => {
            this.loaderService.display(false);
        });
    }

    private updatePass() {
        this.loaderService.display(true); 
        const username = JSON.parse(localStorage.getItem('currentUser'))['username'];
        this.helperService.PUT(`/api/users/change/password/${username}`, this.pass)
        .map((response: Response) => {

            const res = response.json();
            if(res['status'] === 'success') {
                this.formActive = 'form';
                this.snackBar.open(res.message, 'Actualización', {
                    duration: 3500,
                });
            }

        }).subscribe(
        (error) => {
            this.loaderService.display(false);
        },
        (done) => {
            this.loaderService.display(false);
        });
    }

    private updateProfile() {
        this.loaderService.display(true);
        this.helperService.PUT(`/api/users/${this.model.id}`, this.model)
        .map((response: Response) => {

            const res = response.json();
            if (res.status === 'success') {
                this.snackBar.open(res.message, 'Actualización', {
                    duration: 3500,
                });

                const views = res.data['usercompany']['userprofile']['privileges'];
                localStorage.setItem('view', JSON.stringify(views));
                localStorage.setItem('objUser', JSON.stringify(res.data));
                window.location.reload();
            }

        }).subscribe(
        (error) => {
            this.loaderService.display(false);
        },
        (done) => {
            this.loaderService.display(false);
        });
    }
}
