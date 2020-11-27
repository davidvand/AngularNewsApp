import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../models';
import { Article } from '../models/news.model';
import { UserService, AuthenticationService } from '../services';
import { Articleservice} from '../services/article.service';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
    currentUser: User;
    newsArticles:  Article[];


    constructor(
        private authenticationService: AuthenticationService,
        private articleservice: Articleservice,
    ) {
        this.newsArticles = [];

    }

    ngOnInit() {
        this.loadAllArticles();
    }

    deleteArticle(id: number) {
        this.articleservice.delete(id)
            .pipe(first())
            .subscribe(() => this.loadAllArticles());
    }

    private loadAllArticles() {
        this.articleservice.getAll()
            .subscribe(news => {this.newsArticles = news});
            console.log(this.newsArticles);

    }
    
}