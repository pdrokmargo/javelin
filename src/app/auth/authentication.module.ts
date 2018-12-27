import { CommonModule } from '@angular/common';
import { JsonpModule, HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from './authentication.service';
import { AuthRoutingModule } from './authentication-routing.module';
import { PageLoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import {
    MatIconModule,
    MatInputModule,
    MatButtonModule
  } from '@angular/material';

@NgModule({
    imports: [
        HttpModule,
        JsonpModule,
        AuthRoutingModule,
        FormsModule,
        CommonModule,
        MatIconModule,
        MatInputModule,
        MatButtonModule        
    ],
    exports: [],
    declarations: [
        PageLoginComponent
    ],    
    providers: [
        AuthenticationService
    ]
})
export class AuthenticationModule { }
