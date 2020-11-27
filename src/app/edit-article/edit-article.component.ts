import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models';
import { ArticleStatus } from '../models/articlestatus.model';
import { Article } from '../models/news.model';
import { Tag } from '../models/tag.model';
import { AuthenticationService, UserService } from '../services';
import { Articleservice } from '../services/article.service';
import { Statusservice } from '../services/status.service';
import { Tagservice } from '../services/tag.service';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.scss']
})
export class EditArticleComponent implements OnInit {
  userForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  currentUser: User;
  tags: Tag[];
  statuses: ArticleStatus[];
  id: string;
  currentArticle: Article;



  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private articleservice: Articleservice,
    private statusservice: Statusservice,
    private tagservice: Tagservice,
    private userservice: UserService,
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {
    this.userForm = this.formBuilder.group({
      title: new FormControl('', Validators.required),
      subtitle: new FormControl('', Validators.required),
      shortsummary: new FormControl('', Validators.required),
      body: new FormControl('', Validators.required),
      imageurl: new FormControl('', Validators.required),
      tag: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required)

    });

    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
   }

  ngOnInit(): void {
    this.loadArticle();

    this.loadAllvalues();


  }

  get f() { return this.userForm.controls; }



  loadArticle(){
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    this.articleservice.getArticle(parseInt(this.id))
        .subscribe(news => {this.currentArticle = news},  news => {console.log(news)});
       
  }

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
   newArticle.articleID = this.currentArticle.articleID;
   newArticle.title =this.f.title.value;
   newArticle.subTitle =this.f.subtitle.value;
   newArticle.shortSummary =this.f.shortsummary.value;
   newArticle.body =this.f.body.value;
   newArticle.imageUrl = this.f.imageurl.value;
   newArticle.userID = this.currentUser.userID;
   newArticle.tagID = this.f.tag.value;
   newArticle.articleStatusID = this.f.status.value;
   newArticle.likes = this.currentArticle.likes;


   this.articleservice.updateArticle(this.currentArticle.articleID,newArticle)
       .subscribe(data => {this.router.navigate(['/artikelen'])});

       
}

}
