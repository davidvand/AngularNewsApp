import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`https://localhost:44348/api/User`);
    }

    getOne(id: number){
        return this.http.get<User>(`https://localhost:44348/api/User/${id}`);
    }

    register(user: User) {
        return this.http.post(`https://localhost:44348/api/User`, user);
    }

    delete(id: number) {
        console.log(id);
        return this.http.delete(`https://localhost:44348/api/User/${id}`);
    }
}