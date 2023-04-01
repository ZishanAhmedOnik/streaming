import { Component, ViewChild } from '@angular/core';
import { PageSlideComponent } from 'src/app/shared/page-slide';

@Component({
  selector: 'episodes-list',
  templateUrl: './episodes-list.component.html',
  styleUrls: ['./episodes-list.component.css'],
})
export class EpisodesListComponent {
  @ViewChild(PageSlideComponent)
  private readonly pageSlide: PageSlideComponent;

  slide() {
    this.pageSlide.slide();
  }
}
