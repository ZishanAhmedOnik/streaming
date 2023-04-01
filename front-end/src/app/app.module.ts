import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EpisodeSorterComponent } from './components/episode-sorter/episode-sorter.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SeasonsListComponent } from './components/season-list/seasons-list.component';
import { EpisodesListComponent } from './components/episodes-list/episodes-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageSlideComponent } from './shared/page-slide/page-slide.component';

@NgModule({
  declarations: [
    AppComponent,
    EpisodeSorterComponent,
    SeasonsListComponent,
    EpisodesListComponent,
    PageSlideComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    DragDropModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
