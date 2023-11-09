import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { AudioService } from 'src/app/services/audio.service';
import { ApiListResponse } from 'src/app/models/api';
import { Content } from 'src/app/models/content';

@Component({
  selector: 'app-audio-list',
  templateUrl: './audio-list.component.html',
  styleUrls: ['./audio-list.component.scss']
})
export class AudioListComponent implements OnInit {
  audioList: Array<Content>;
  displayedColumns: string[] = [
    'id',
    'title',
    'name'
  ];
  dataSource: MatTableDataSource<Content>;
  currentPage: number;
  length: number;
  loading: boolean;

  constructor(
    private audioService: AudioService,
    public router: Router,
    public route: ActivatedRoute
  ) {
    this.currentPage = 1;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.loading = true;
      this.currentPage = +(params['page'] ?? '1');
      this.getAudioList();
    });
  }

  getAudioList(): void {
    this.audioService.list({
      page: this.currentPage,
    }).pipe(
      finalize(() => this.loading = false)
    ).subscribe({
      next: (res: ApiListResponse<Content>) => {
        this.audioList = res.list;
        this.length = res.pageable.total;
        this.dataSource = new MatTableDataSource(this.audioList);
      },
      error: err => {
        console.log('Get Audio List Error: ', err);
        this.audioList = [];
        this.dataSource = new MatTableDataSource(this.audioList);
      }
    });
  }

  pageChange(event: { pageSize: number; pageIndex: number; }): void {
    // todo
  }

  selectAudio(audio: Content): void {
    this.audioService._content.next(audio);
  }

}
