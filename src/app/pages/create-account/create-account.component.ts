import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  constructor(private fb: FormBuilder, 
              public userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
  }

  get f(): { [key: string]: AbstractControl } {
    return this.signupForm.controls;
  }

  signupForm = this.fb.group({
    email:['', [Validators.required, Validators.email]],
    username:['', [Validators.required, Validators.minLength(10)]],
    password:['', [Validators.required, Validators.minLength(6)]]
  })

  create() {
    this.userService.createNewUser(this.signupForm.value).subscribe((data: any) => {
      this.userService.user = data;
      localStorage.setItem('user', JSON.stringify(data));
      this.router.navigate(['/posts']);
    });
  }
}
