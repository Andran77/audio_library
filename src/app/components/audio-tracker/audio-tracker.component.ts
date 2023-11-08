import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Content } from 'src/app/models/content';
import { AudioService } from 'src/app/services/audio.service';

@Component({
  selector: 'app-audio-tracker',
  templateUrl: './audio-tracker.component.html',
  styleUrls: ['./audio-tracker.component.scss']
})
export class AudioTrackerComponent implements OnInit, OnDestroy {
  audioFile: HTMLAudioElement;
  play: boolean;
  showError: boolean;
  mutedAudio: boolean;
  currentTime: number;
  intervalSubscription: any;

  private _content: Content;
  get content(): Content {
    return this._content;
  }
  @Input() set content(content: Content) {
    this._content = content;
    if (this.play) {
      this.audioFile.pause();
      clearInterval(this.intervalSubscription);
    }
    const volume = +(localStorage.getItem('volume') || 1);
    this.currentTime = 0;
    this.audioFile = new Audio();
    this.audioFile.src = content.src;
    this.audioFile.volume = volume;
    this.audioFile.load();
    this.audioFile.play().then((event) => {
      this.play = true;
      this.intervalSubscription = setInterval(this.updateAudio, 500);
    });
    this.audioFile.onerror = () => {
      this.showError = true;
    }
  }

  constructor(
    private audioService: AudioService
  ) { }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    if (this.play) {
      this.audioFile.pause();
      clearInterval(this.intervalSubscription);
    }
  }

  updateAudio = () => {
    this.currentTime = this.audioFile?.currentTime;
    if (this.audioFile?.ended) {
      clearInterval(this.intervalSubscription);
      this.play = false;
      this.audioService._content.next(undefined);
    }
  }

  onChangeDur(event: any): void {
    this.audioFile.currentTime = event.value;
    this.currentTime = this.audioFile.currentTime;
  }

  onChangeVol(event: any): void {
    this.audioFile.volume = event.value;
    localStorage.setItem('volume', event.value);
    this.mutedAudio = event.value === 0;
  }

  togglePlay(): void {
    if (this.play) {
      this.audioFile.pause();
      clearInterval(this.intervalSubscription);
    } else {
      this.audioFile.play().then((event) => {
        this.intervalSubscription = setInterval(this.updateAudio, 500);
      });
    }
    this.play = !this.play;
  }

  muteAudio(): void {
    if (this.mutedAudio) {
      this.audioFile.volume = 1;
    } else {
      this.audioFile.volume = 0;
    }
    localStorage.setItem('volume', this.audioFile.volume.toString());
    this.mutedAudio = !this.mutedAudio;
  }

  close(): void {
    this.audioService._content.next(undefined);
  }

}
