import { Injectable } from "@angular/core";
import {
  Http,
  Response,
  Headers,
  RequestOptions,
  URLSearchParams
} from "@angular/http";
import { Observable } from "rxjs";
import { AUTH_CONFIG } from "./auth0-variables";

@Injectable()
export class AuthenticationService {

  public token: string;
  public urlBase: string;
  public headers;

  constructor(private http: Http) {
    var currentUser = JSON.parse(localStorage.getItem("currentUser"));
    // this.urlBase = 'http://javelin.myecolombia.com.co';
    this.urlBase = 'https://javelinservice.herokuapp.com';
    // this.urlBase = 'http://localhost/javelinservice/public';

    if (localStorage.getItem('currentUser') != null) {
      this.headers = new Headers({
        "Accept": "application/json",
        "Authorization": "Bearer " + JSON.parse(localStorage.getItem('currentUser'))["access_token"]
      });
    }
  }

  login(username: string, password: string) {
    let body = new URLSearchParams();

    body.set("grant_type", AUTH_CONFIG.GRANT_TYPE);
    body.set("client_id", AUTH_CONFIG.CLIENT_ID);
    body.set("client_secret", AUTH_CONFIG.CLIENT_SECRET)
    body.set("username", username);
    body.set("password", password);
    body.set("scope", AUTH_CONFIG.SCOPE);

    return this.http.post(`${this.urlBase}/oauth/token`, body)
    .map((response: Response) => {
      let token = response.json() && response.json().access_token;
      if (token) {
        this.token = token;
        let refresh_token = response.json().refresh_token;
        let expire_in = response.json().expire_in;
        localStorage.setItem("currentUser", JSON.stringify({
          username: username,
          access_token: token,
          refresh_token: refresh_token,
          expire_in: expire_in
        }));       
      } 
    });
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem("currentUser");
    localStorage.removeItem("view");
    localStorage.removeItem("view_actual");  
    localStorage.removeItem("objUser");  
  }

  change_company(obj: any){
    var user = JSON.parse(localStorage.getItem('objUser'));
    this.PUT(`users/chenge_company/${user.id}`, {'company_id':obj.id}).subscribe(res => {
      if (res.status == 'success') {   
        var views = res.data['usercompany']["userprofile"]["privileges"];
        localStorage.setItem('view', JSON.stringify(views));
        localStorage.setItem('objUser', JSON.stringify(res.data));
        window.location.reload();
      }
    }, err => {
      console.log(err);
    });
  }

  POST(url: string, data: Object): Observable<any> {
    this.headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + JSON.parse(localStorage.getItem('currentUser'))["access_token"]
    });
    console.log("Bearer " + JSON.parse(localStorage.getItem('currentUser'))["access_token"]);
    
    console.log(JSON.stringify(data));
    
    return this.http.post(`${this.urlBase}/api/${url}`, { data: JSON.stringify(data) }, { headers: this.headers })
      .map(res => { return res.json() })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  GET(url: string): Observable<Object> {
    this.headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + JSON.parse(localStorage.getItem('currentUser'))["access_token"]
    });
    return this.http.get(`${this.urlBase}/api/${url}`, { headers: this.headers })
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  PUT(url: string, data: Object): Observable<any> {
    this.headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + JSON.parse(localStorage.getItem('currentUser'))["access_token"]
    });
    return this.http.put(`${this.urlBase}/api/${url}`, { data: JSON.stringify(data) }, { headers: this.headers })
      .map(res => { return res.json() })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  DELETE(url: string): Observable<any> {
    this.headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + JSON.parse(localStorage.getItem('currentUser'))["access_token"]
    });
    return this.http.delete(`${this.urlBase}/api/${url}`, { headers: this.headers })
      .map(res => { return res.json() })
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  public PRIVILEGE(link: string): Observable<Object> {
    this.headers = new Headers({
      "Accept": "application/json",
      "Authorization": "Bearer " + JSON.parse(localStorage.getItem('currentUser'))["access_token"]
    });
    return this.http.get(`${this.urlBase}/api/privilege/${link}`, { headers: this.headers })
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
