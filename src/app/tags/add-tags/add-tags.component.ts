import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Tag } from 'src/app/models/tag.model';
import { Tagservice } from 'src/app/services/tag.service';

@Component({
  selector: 'app-add-tags',
  templateUrl: './add-tags.component.html',
  styleUrls: ['./add-tags.component.scss']
})
export class AddTagsComponent implements OnInit {
  userForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private tagservice: Tagservice,
    ) { 
      this.userForm = this.formBuilder.group({
        name: ['', Validators.required]
      });
      
    }

  ngOnInit(): void {
  }

  get f() { return this.userForm.controls; }


  onSubmit() {
    console.log("check");

   this.submitted = true;



   this.loading = true;
   let newTag = new Tag();
   newTag.name =this.f.name.value;


   this.tagservice.register(newTag)
       .subscribe(data => {this.router.navigate(['/tags'])});

       
}

}
