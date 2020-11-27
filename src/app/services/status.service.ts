import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ArticleStatus } from '../models/articlestatus.model';
import { Article } from '../models/news.model';

@Injectable({ providedIn: 'root' })
export class Statusservice {
    constructor(private http: HttpClient) { }

    getAll() {
        this.http.get<ArticleStatus[]>(`https://localhost:44348/api/ArticleStatus`).subscribe(
            data => console.log(data)
        );
        return this.http.get<ArticleStatus[]>(`https://localhost:44348/api/ArticleStatus`);
    }

    register(status: ArticleStatus) {
        return this.http.post(`https://localhost:44348/Article/api/ArticleStatus`, status);
    }

    getOne(id: number) {
        return this.http.get<ArticleStatus>(`https://localhost:44348/api/ArticleStatus/${id}`);
    }

    delete(id: number) {
        return this.http.delete(`https://localhost:44348/api/ArticleStatus/${id}`);
    }
}