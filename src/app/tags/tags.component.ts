import { Component, OnInit } from '@angular/core';
import { Tag } from '../models/tag.model';
import { Tagservice } from '../services/tag.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {
  tags: Tag[];


  constructor(private tagservice: Tagservice) {
    this.tags = [];
   }

  ngOnInit(): void {
    this.loadTags();
  }

  deleteTag(tag: Tag) {
    console.log(tag.tagID);
    this.tagservice.delete(tag.tagID)
        .subscribe(() => this.loadTags());
}

  private loadTags() {
    this.tagservice.getAll()
        .subscribe(data => {this.tags = data});

}

}
