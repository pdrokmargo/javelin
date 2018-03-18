import { CommonModule } from '@angular/common';
import { JsonpModule, HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from './authentication.service';
import { AuthRoutingModule } from './authentication-routing.module';
import { PageLoginComponent } from './login/login.component';
import { MaterialModule } from '@angular/material';
import { NgModule } from '@angular/core';


@NgModule({
    imports: [
        MaterialModule,
        HttpModule,
        JsonpModule,
        AuthRoutingModule,
        FormsModule,
        CommonModule,        
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
