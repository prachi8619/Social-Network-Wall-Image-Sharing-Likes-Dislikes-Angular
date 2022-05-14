import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  constructor(private fb:FormBuilder, 
              public userService: UserService,
              private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  loginForm = this.fb.group({
    loginEmail:['', [Validators.required, Validators.email]],
    password:['', [Validators.required, Validators.minLength(6)]]
  })

  loggedIn() {
      this.userService.getUser(this.loginForm.value['loginEmail']).subscribe((data: any) => {
        if(data[0].length === 0) {
          this.snackBar.open("Account does not exist", 'Ok');
        } else {
          if(data[0].password === this.loginForm.value.password) {
            this.snackBar.open("User Logged in !!", 'Ok');
            this.userService.user = data[0] ;
            localStorage.setItem('user', JSON.stringify(data[0]));
            this.router.navigate(['/posts']);
          } else {
            this.snackBar.open("Incorrect Password", 'Ok');
          }
        }
      });
  }
}
