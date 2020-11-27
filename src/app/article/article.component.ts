import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Article } from '../models/news.model';
import {Comment } from '../models/comment.model';
import { Articleservice } from '../services/article.service';
import { Commentservice } from '../services/comment.service';
import { User } from '../models';
import { AuthenticationService } from '../services';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
id: string;
currentArticle: Article;
currentUser: User;
reactForm: FormGroup;
loading = false;
submitted = false;
disabled = true;
comments: Comment[];

  constructor(private route: ActivatedRoute,
    private articleservice: Articleservice,
    private commentservice: Commentservice,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService) {
      this.reactForm = this.formBuilder.group({
        comment: ['', Validators.required]      
      });
      this.comments = [];
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
     }

  ngOnInit(): void {
    this.loadArticle();
    this.loadComments();
  }


  loadComments(){
    this.commentservice.getAll().subscribe(data => {this.comments = data.filter(item => item.articleID == this.currentArticle.articleID)});
  }

  loadArticle(){
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    this.articleservice.getArticle(parseInt(this.id))
        .subscribe(news => {this.currentArticle = news});
        console.log(this.currentArticle);
  }

  get f() { return this.reactForm.controls; }


  onSubmit() {
    let newComment = new Comment();
    newComment.text = this.f.comment.value;
    newComment.articleID = this.currentArticle.articleID;
    newComment.userID = this.currentUser.userID;
    this.commentservice.addComment(newComment).subscribe(() =>  this.loadComments(),

                error => {
                    console.log(error);
                    this.loading = false;
                }, () => {this.disabled = false});




  }

  likeArticle(){
    let articleToUpdate = new Article();
    articleToUpdate.articleID = this.currentArticle.articleID;
    articleToUpdate.title = this.currentArticle.title;
    articleToUpdate.subTitle = this.currentArticle.subTitle;
    articleToUpdate.shortSummary = this.currentArticle.shortSummary;
    articleToUpdate.body = this.currentArticle.body;
    articleToUpdate.imageUrl = this.currentArticle.imageUrl;
    articleToUpdate.tagID = this.currentArticle.tagID;
    articleToUpdate.userID = this.currentArticle.userID;
    articleToUpdate.articleStatusID = this.currentArticle.articleStatusID;
    articleToUpdate.likes = this.currentArticle.likes +1;
  this.articleservice.updateArticle(articleToUpdate.articleID, articleToUpdate).subscribe(() =>  this.loadArticle());
  }

}
