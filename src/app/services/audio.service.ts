import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Params } from '@angular/router';
import { Content } from 'src/app/models/content';
import { ApiListResponse } from 'src/app/models/api';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  _content: Subject<Content> = new Subject();

  constructor(
    private http: HttpClient
  ) { }

  list(params: Params): Observable<ApiListResponse<Content>> {
    // todo: params для того чтоб в будущем можно было подключить пагинацию
    return this.http.get<ApiListResponse<Content>>('./assets/server/api.json');
  }

}
