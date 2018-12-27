import { AuthenticationService } from "./../authentication.service";
import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { MatSnackBar, MatIconModule, MatFormFieldModule } from "@angular/material";

@Component({
  selector: "my-page-login",
  styles: [],
  templateUrl: "./login.component.html"
})
export class PageLoginComponent implements OnInit {
  model: any = {};
  error = '';
  private btn_text = '';
  private views = [];

  constructor(
    private router: Router,
    private service: AuthenticationService,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit() {

    this.btn_text = 'Ingresar';
    this.service.logout();
  }

  login(): void {
    this.btn_text = 'Procesando...';

    this.service
      .login(this.model.username, this.model.password)
      .subscribe(data => {

        this.service.GET(`login`).subscribe(res => {

          console.log(res);

          if (!res['usercompany']) {
            this.snackBar.open('Usted no tiene una empresa asignada.', 'Error', {
              duration: 3500,
            });
            return false;
          }
          this.views = res['usercompany']["userprofile"]["privileges"];
          localStorage.setItem('view', JSON.stringify(this.views));
          localStorage.setItem('objUser', JSON.stringify(res));
          let link = ['/dashboard'];
          this.router.navigate(link);
        }, err => {
          this.snackBar.open('El usuario o la contraseña son incorrectos.', 'Error', {
            duration: 3500,
          });
        });

      }, error => {
        this.snackBar.open('El usuario o la contraseña son incorrectos.', 'Error', {
          duration: 3500,
        });
      });
  }


}