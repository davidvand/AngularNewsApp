import { NgModule } from '@angular/core';
import {MatInputModule} from '@angular/material/input'
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditArticleComponent } from '../edit-article.component';
import {MatFormFieldModule} from '@angular/material/form-field';



@NgModule({
  declarations: [
    EditArticleComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  NgModule,
  MatInputModule,
  MatFormFieldModule
    ],

    exports: [
      EditArticleComponent
    ]
})
export class EditArticleModule { }
