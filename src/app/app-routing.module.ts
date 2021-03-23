import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SearchMovieComponent } from './search-movie/search-movie.component';
import { ShowsComponent } from './shows/shows.component';
import { CreateNewShowsComponent } from './create-new-shows/create-new-shows.component';

const routes: Routes = [
  { path: '', redirectTo: 'app-add-movies', pathMatch: 'full'},
  { path: 'app-search-movie', component: SearchMovieComponent},
  { path: 'app-create-new-shows', component: CreateNewShowsComponent},
  { path: 'app-shows', component: ShowsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
