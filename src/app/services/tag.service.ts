import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Tag } from '../models/tag.model';

@Injectable({ providedIn: 'root' })
export class Tagservice {
    constructor(private http: HttpClient) { }

    getAll() {
        this.http.get<Tag[]>(`https://localhost:44348/api/Tag`).subscribe(
            data => console.log(data)
        );
        return this.http.get<Tag[]>(`https://localhost:44348/api/Tag`);
    }

    getOne(id: number)
    {
        return this.http.get<Tag>(`https://localhost:44348/api/Tag/${id}`);
    }

    register(tag: Tag) {
        return this.http.post(`https://localhost:44348/api/Tag`, tag);
    }

    delete(id: number) {
        return this.http.delete(`https://localhost:44348/api/Tag/${id}`);
    }
}