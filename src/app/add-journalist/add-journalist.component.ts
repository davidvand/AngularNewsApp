import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { UserService} from '../services';
import { User } from '../models';

@Component({
  selector: 'app-add-journalist',
  templateUrl: './add-journalist.component.html',
  styleUrls: ['./add-journalist.component.scss']
})
export class AddJournalistComponent implements OnInit {
  userForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userservice: UserService
  ) { 
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/journalisten';
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  }

   // convenience getter for easy access to form fields
   get f() { return this.userForm.controls; }

   onSubmit() {
     console.log("check");

    this.submitted = true;



    this.loading = true;
    let newUser = new User();
    newUser.email =this.f.email.value;
    newUser.firstName =this.f.firstname.value;
    newUser.lastName =this.f.lastname.value;
    newUser.username =this.f.username.value;
    newUser.password ="welkom";
    newUser.roleID =2;


    this.userservice.register(newUser)
        .subscribe(data => {this.router.navigate(['/journalisten'])});

        
}

}
