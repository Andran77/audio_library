import { Component, OnInit } from '@angular/core';
import { AudioService } from 'src/app/services/audio.service';
import { Content } from 'src/app/models/content';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  content: Content;

  constructor(
    private audioService: AudioService
  ) { }

  ngOnInit() {
    this.audioService._content.subscribe(content => {
      this.content = content;
    });
  }
}
