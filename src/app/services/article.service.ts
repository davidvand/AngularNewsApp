import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Article } from '../models/news.model';

@Injectable({ providedIn: 'root' })
export class Articleservice {
    constructor(private http: HttpClient) { }

    getAll() {
        this.http.get<Article[]>(`https://localhost:44348/api/Article`).subscribe(
            data => console.log(data)
        );
        return this.http.get<Article[]>(`https://localhost:44348/api/Article`);
    }

    getArticle(id: number){
        return this.http.get<Article>(`https://localhost:44348/api/Article/${id}`);

    }

    updateArticle(id: number, article: Article){
        return this.http.put<Article>(`https://localhost:44348/api/Article/` + id, article);
    }

    register(article: Article) {
        console.log(article);
        return this.http.post(`https://localhost:44348/api/Article`, article);
    }

    delete(id: number) {
        return this.http.delete(`https://localhost:44348/api/Article/${id}`);
    }
}