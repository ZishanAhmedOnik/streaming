import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/config';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { lastValueFrom } from 'rxjs';
import { PageSlideComponent } from 'src/app/shared/page-slide';

@Component({
  selector: 'episode-sorter',
  templateUrl: './episode-sorter.component.html',
  styleUrls: ['./episode-sorter.component.css'],
})
export class EpisodeSorterComponent {
  @ViewChild(PageSlideComponent)
  private readonly pageSlideComponent: PageSlideComponent;
  private seasonId = 0;

  constructor(private readonly httpClient: HttpClient) {}

  episodes: { Id: number; OrderInList: number; FileName: string }[] = [];

  showSlide(seasonId: number) {
    this.seasonId = seasonId;
    this.refresh();
    this.pageSlideComponent.slide();
  }

  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.episodes, event.previousIndex, event.currentIndex);
    this.updateOrder();
  }

  private async updateOrder() {
    const map = new Map();
    for (let i = 0; i < this.episodes.length; i++) {
      map.set(this.episodes[i].Id, i);
    }
    await lastValueFrom(
      this.httpClient.post(
        `${API_URL}/season/updateEpisdeOrderInList/${this.seasonId}`,
        Array.from(map)
      )
    );
    this.refresh();
  }

  private async refresh() {
    this.episodes = await lastValueFrom(
      this.httpClient.get<any>(`${API_URL}/season/getEpisodes/${this.seasonId}`)
    );
  }
}
