import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { fakeBackendProvider } from './_helpers';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { ControlpanelComponent } from './controlpanel/controlpanel.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { JournalistenComponent } from './journalisten/journalisten.component';
import { AddJournalistComponent } from './add-journalist/add-journalist.component';
import { ArtikelenComponent } from './artikelen/artikelen.component';
import { AddArtikelenComponent } from './add-artikelen/add-artikelen.component';
import { TagsComponent } from './tags/tags.component';
import { AddTagsComponent } from './tags/add-tags/add-tags.component';
import { FrontpageComponent } from './frontpage/frontpage.component';
import { ArticleComponent } from './article/article.component';
import { EditArticleComponent } from './edit-article/edit-article.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ControlpanelComponent,
    JournalistenComponent,
    AddJournalistComponent,
    ArtikelenComponent,
    AddArtikelenComponent,
    TagsComponent,
    AddTagsComponent,
    FrontpageComponent,
    ArticleComponent,
    EditArticleComponent,
    
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    FontAwesomeModule,
    MatIconModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider
],
  bootstrap: [AppComponent]
})
export class AppModule { }
