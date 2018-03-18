import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { AuthenticationService } from "../../auth/authentication.service";


@Injectable()
export class HelperService {

  public baseUrl: string;  
  constructor(private http: Http,
                private authService: AuthenticationService) { 
  
    this.baseUrl = authService.urlBase;
    
  }

  GET(url: string) { 
    return this.http.get(this.baseUrl+url, this.headers());
  }

  POST(url: string, data: any) {    
    return this.http.post(this.baseUrl+url,{ data: JSON.stringify(data) }, this.headers());
  }

  PUT(url: string, data: any) {
    return this.http.put(this.baseUrl+url, { data: JSON.stringify(data) }, this.headers());
  }

  DELETE(url: string) {    
    return this.http.delete(this.baseUrl+url, this.headers());
  }

  POSTFORMDATA(url: string, data: FormData) {    
    return this.http.post(this.baseUrl+url, data, this.headerFormData());
  }

  PUTFORMDATA(url: string, data: FormData) {    
    return this.http.put(this.baseUrl+url, data, this.headerFormData());
  }

  headers():RequestOptions{
    let header = new Headers({
        "Accept": "application/json",
        "Authorization": "Bearer " + JSON.parse(localStorage.getItem('currentUser'))["access_token"]
    });	
    return new RequestOptions({ headers: header });
  }

  headerFormData():RequestOptions{
    let header = new Headers({
        // "Content-Type": "multipart/form-data",
        // "Accept": "application/json",
        "Authorization": "Bearer " + JSON.parse(localStorage.getItem('currentUser'))["access_token"]
    });	
    return new RequestOptions({ headers: header });
  }
  
  
}
