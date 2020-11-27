import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models';
import { AuthenticationService, UserService } from '../services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService
  ) {

    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
  }
   }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
    });
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
      this.submitted = true;

      
      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }

      this.loading = true;


      this.loading = true;
    let newUser = new User();
    newUser.email =this.f.email.value;
    newUser.firstName =this.f.firstname.value;
    newUser.lastName =this.f.lastname.value;
    newUser.username =this.f.username.value;
    newUser.password ="welkom";
    newUser.roleID =1;
    
      this.userService.register(newUser)
          .subscribe(
              data => {
                  this.router.navigate(['/login']);
              },
              error => {
                  this.loading = false;
              });
  }

}
