import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { API_URL } from 'src/config';
import { EpisodeSorterComponent } from '../episode-sorter/episode-sorter.component';
import { EpisodesListComponent } from '../episodes-list';

@Component({
  selector: 'seasons-list',
  templateUrl: './seasons-list.component.html',
  styleUrls: ['./seasons-list.component.css'],
})
export class SeasonsListComponent implements OnInit {
  @ViewChild(EpisodesListComponent)
  private readonly episodeList: EpisodesListComponent;
  @ViewChild(EpisodeSorterComponent)
  private readonly episodeSorter: EpisodeSorterComponent;

  constructor(private readonly httpClient: HttpClient) {}

  seasons: any[] = [];

  ngOnInit() {
    this.refresh();
  }

  showSlide() {
    this.episodeList.slide();
  }

  async refresh() {
    this.seasons = await lastValueFrom(
      this.httpClient.get<any[]>(`${API_URL}/season/get`)
    );
  }

  showEpisodeSorter(seasonId: number) {
    this.episodeSorter.showSlide(seasonId);
  }
}
