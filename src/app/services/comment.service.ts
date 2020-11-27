import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Comment } from '../models/comment.model';

@Injectable({ providedIn: 'root' })
export class Commentservice {
    constructor(private http: HttpClient) { }

    getAll() {
        this.http.get<Comment[]>(`https://localhost:44348/api/Comment`).subscribe(
            data => console.log(data)
        );
        return this.http.get<Comment[]>(`https://localhost:44348/api/Comment`);
    }

    getComment(id: number){
        return this.http.get<Comment>(`https://localhost:44348/api/Comment/${id}`);

    }

    updateComment(id: number, comment: Comment){
        return this.http.put<Comment>(`https://localhost:44348/api/Comment/` + id, comment);
    }

    addComment(comment: Comment) {
        console.log(comment);
        return this.http.post(`https://localhost:44348/api/Comment`, comment);
    }

    delete(id: number) {
        return this.http.delete(`https://localhost:44348/api/Comment/${id}`);
    }
}