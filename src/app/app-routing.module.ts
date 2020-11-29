import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ControlpanelComponent } from './controlpanel/controlpanel.component';
import { JournalistenComponent } from './journalisten/journalisten.component';
import { AddJournalistComponent } from './add-journalist/add-journalist.component';


import { AuthGuard } from './_helpers';
import { ArtikelenComponent } from './artikelen/artikelen.component';
import { AddArtikelenComponent } from './add-artikelen/add-artikelen.component';
import { TagsComponent } from './tags/tags.component';
import { AddTagsComponent } from './tags/add-tags/add-tags.component';
import { FrontpageComponent } from './frontpage/frontpage.component';
import { ArticleComponent } from './article/article.component';
import { EditArticleComponent } from './edit-article/edit-article.component';

const routes: Routes = [
  { path: '', component: FrontpageComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'controlpanel', component: ControlpanelComponent },
  { path: 'journalisten', component: JournalistenComponent },
  { path: 'add-journalist', component: AddJournalistComponent },
  { path: 'add-artikel', component: AddArtikelenComponent },
  { path: 'artikelen', component: ArtikelenComponent },
  { path: 'tags', component: TagsComponent },
  { path: 'add-tag', component: AddTagsComponent },
  { path: 'frontpage', component: FrontpageComponent },
  { path: 'article', component: ArticleComponent },
  { path: 'edit-article', component: EditArticleComponent },











  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
