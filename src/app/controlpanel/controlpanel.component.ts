import { Component, OnInit } from '@angular/core';
import { User } from '../models';
import { AuthenticationService } from '../services';

@Component({
  selector: 'app-controlpanel',
  templateUrl: './controlpanel.component.html',
  styleUrls: ['./controlpanel.component.scss']
})
export class ControlpanelComponent implements OnInit {
  currentUser: User;


  constructor(
    private authenticationService: AuthenticationService
  ) { 
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);

  }

  ngOnInit(): void {
    console.log(this.currentUser.roleID);
  }

}
