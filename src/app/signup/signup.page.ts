import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService, AuthData } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  authData: AuthData = { email: '', password: '' };
  singupForm: FormGroup;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.singupForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', {
        validators: [Validators.required]
      })
    });
  }

  onSubmit() {
    this.authService.registerUser({
      email: this.singupForm.value.email,
      password: this.singupForm.value.password
    });
  }

}
