import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models';
import { ArticleStatus } from '../models/articlestatus.model';
import { Article } from '../models/news.model';
import { Tag } from '../models/tag.model';
import { AuthenticationService, UserService } from '../services';
import { Articleservice } from '../services/article.service';
import { Statusservice } from '../services/status.service';
import { Tagservice } from '../services/tag.service';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-add-artikelen',
  templateUrl: './add-artikelen.component.html',
  styleUrls: ['./add-artikelen.component.scss']
})
export class AddArtikelenComponent implements OnInit {
  userForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  currentUser: User;
  tags: Tag[];
  statuses: ArticleStatus[];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private articleservice: Articleservice,
    private statusservice: Statusservice,
    private tagservice: Tagservice,
    private userservice: UserService,
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) { 
    this.userForm = this.formBuilder.group({
      title: ['', Validators.required],
      subtitle: ['', Validators.required],
      shortsummary: ['', Validators.required],
      body: ['', Validators.required],
      imageurl: ['', Validators.required],
      tag: ['', Validators.required],
      status: ['', Validators.required]

    });
    this.tags = [];
    this.statuses = [];

    this.currentUser = this.authenticationService.currentUserValue;

  }

  ngOnInit(): void {
    this.loadAllvalues();

    
  }

  get f() { return this.userForm.controls; }

  private loadAllvalues() {
    this.tagservice.getAll()
        .subscribe(data => {this.tags = data});
        this.statusservice.getAll()
        .subscribe(data => {this.statuses = data.filter(item => item.articleStatusID !== 3)});

}


   onSubmit() {
     console.log("check");

    this.submitted = true;



    this.loading = true;
    let newArticle = new Article();
    newArticle.title =this.f.title.value;
    newArticle.subTitle =this.f.subtitle.value;
    newArticle.shortSummary =this.f.shortsummary.value;
    newArticle.body =this.f.body.value;
    newArticle.imageUrl = this.f.imageurl.value;
    newArticle.userID = this.currentUser.userID;
    newArticle.tagID = this.f.tag.value;
    newArticle.articleStatusID = this.f.status.value;

    this.articleservice.register(newArticle)
        .subscribe(data => {this.router.navigate(['/artikelen'])});

        
}

}
