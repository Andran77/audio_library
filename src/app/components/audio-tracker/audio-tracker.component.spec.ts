import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioTrackerComponent } from './audio-tracker.component';

describe('AudioTrackerComponent', () => {
  let component: AudioTrackerComponent;
  let fixture: ComponentFixture<AudioTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AudioTrackerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
