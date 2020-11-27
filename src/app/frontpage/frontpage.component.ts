import { Component, OnInit } from '@angular/core';
import { Article } from '../models/news.model';
import { Articleservice } from '../services/article.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { strict } from 'assert';
import { Tag } from '../models/tag.model';
import { Tagservice } from '../services/tag.service';

@Component({
  selector: 'app-frontpage',
  templateUrl: './frontpage.component.html',
  styleUrls: ['./frontpage.component.scss']
})
export class FrontpageComponent implements OnInit {
  newsArticles:  Article[];
  chosenarticle: Article;
  articleID: string;
  userForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  tags: Tag[];



  constructor(   
    private formBuilder: FormBuilder,    
     private articleservice: Articleservice,
     private route: ActivatedRoute,
     private tagservice: Tagservice,
     private router: Router    
     ) {

      this.userForm = this.formBuilder.group({
        search: ['', Validators.required],
        tag: ['', Validators.required]
      
      });
      this.tags = [];
    this.newsArticles = [];

   }

  ngOnInit(): void {
    this.loadAllArticles();
    this.loadAllvalues();
    this.articleID = this.route.snapshot.paramMap.get('id');

  }

  private loadAllvalues() {
    this.tagservice.getAll()
        .subscribe(data => {this.tags = data});
       

}

  get f() { return this.userForm.controls; }

  onSubmit() {
    
    console.log(this.f.search.value);
    console.log(this.f.tag.value);

    
    this.articleservice.getAll()
    .subscribe(news => {
      this.newsArticles = news.filter(
        item =>  item.title.includes(
          this.f.search.value)); this.filterArticle()}
          );
    
      
    
   

    


  }

  filterArticle(){
    console.log(this.newsArticles);

    if(this.newsArticles.length)
    {
      this.articleservice.getAll()
      .subscribe(news => {
        this.newsArticles.concat( news.filter(
          item =>  item.body.includes(
            this.f.search.value)) ); this.filterTag()}
            );
    }
    else{

      this.articleservice.getAll()
    .subscribe(news => {
      this.newsArticles = news.filter(
        item =>  item.body.includes(
          this.f.search.value)); this.filterTag()}
          );

    }
   
  }

  filterTag(){
    console.log(this.newsArticles)

    if(this.f.tag.value != ""){
      /*
      this.articleservice.getAll()
    .subscribe(news => {this.newsArticles = news.filter(item =>  item.tagID == this.f.tag.value)});
    */

    this.newsArticles.forEach((element,index) => {
      if(element.tagID != this.f.tag.value)
      {
        this.newsArticles.splice(index,1);
      }
    });
    }

  }


  gotoArticle(article: Article){
    const artID = article ? article.articleID : null;

    this.router.navigate(['/article', { id: artID }]);
  }

  private loadAllArticles() {
    this.articleservice.getAll()
        .subscribe(news => {this.newsArticles = news});
        console.log(this.newsArticles);

}

}
