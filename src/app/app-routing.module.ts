import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AudioListComponent } from 'src/app/pages/audio-list/audio-list.component';

const routes: Routes = [
  { path: '', component: AudioListComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
