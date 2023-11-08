import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'durationPipe'
})
export class DurationPipe implements PipeTransform {
  transform(value: number): any {
    if (!value) {
      return '00:00';
    }
    const minutes = Math.floor(value/60);
    const seconds = Math.floor(value - minutes*60);

    const minutesToString = minutes < 10 ? '0' + minutes : minutes.toString();
    const secondsToString = seconds < 10 ? '0' + seconds : seconds.toString();
    return minutesToString + ':' + secondsToString;
  }
}
