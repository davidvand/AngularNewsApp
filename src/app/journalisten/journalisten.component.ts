import { Component, OnInit } from '@angular/core';
import { User } from '../models';
import { UserService } from '../services';

@Component({
  selector: 'app-journalisten',
  templateUrl: './journalisten.component.html',
  styleUrls: ['./journalisten.component.scss']
})
export class JournalistenComponent implements OnInit {
  journalisten:  User[];

  constructor(private userservice: UserService) { 
    this.journalisten = [];

  }

  ngOnInit(): void {
    this.loadUsers();
  }

  deleteUser(user: User) {
    console.log(user.userID);
    this.userservice.delete(user.userID)
        .subscribe(() => this.loadUsers());
}

private loadUsers() {
    this.userservice.getAll()
        .subscribe(data => {this.journalisten = data.filter(item => item.roleID == 2)});
        console.log("working");

}

}
