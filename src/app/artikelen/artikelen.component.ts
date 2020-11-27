import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models';
import { ArticleStatus } from '../models/articlestatus.model';
import { Article } from '../models/news.model';
import { Tag } from '../models/tag.model';
import { AuthenticationService } from '../services';
import { Articleservice } from '../services/article.service';
import { Statusservice } from '../services/status.service';

@Component({
  selector: 'app-artikelen',
  templateUrl: './artikelen.component.html',
  styleUrls: ['./artikelen.component.scss']
})
export class ArtikelenComponent implements OnInit {
  artikelen:  Article[];
  status: ArticleStatus;
  user: User;
  tag: Tag;
  currentUser: User;


  constructor(private articleservice: Articleservice,
    private statusservice: Statusservice,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router ) { 
    this.artikelen = [];
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);


  }

  ngOnInit(): void {
    this.loadArticles();

  }

  deleteArticle(article: Article) {
    console.log(article.articleID);
    this.articleservice.delete(article.articleID)
        .subscribe(() => this.loadArticles());
}

editArticle(article: Article){

  const artID = article ? article.articleID : null;

    this.router.navigate(['/edit-article', { id: artID }]);

}

publishArticle(article: Article){
  let articleToUpdate = new Article();
  articleToUpdate.articleID = article.articleID;
  articleToUpdate.title = article.title;
  articleToUpdate.subTitle = article.subTitle;
  articleToUpdate.shortSummary = article.shortSummary;
  articleToUpdate.body = article.body;
  articleToUpdate.imageUrl = article.imageUrl;
  articleToUpdate.tagID = article.tagID;
  articleToUpdate.userID = article.userID;
  articleToUpdate.articleStatusID = 3;
this.articleservice.updateArticle(articleToUpdate.articleID, articleToUpdate).subscribe(() =>  this.loadArticles());
}


  private loadArticles() {
    this.articleservice.getAll()
        .subscribe(data => {this.artikelen = data});
        console.log("working");

}

}
