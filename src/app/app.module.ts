import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';

import { ToastrModule, ToastContainerModule  } from 'ngx-toastr';

import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarModule } from '@ngx-loading-bar/core';

import { AddShowComponent } from './add-show/add-show.component';
import { SearchMovieComponent } from './search-movie/search-movie.component';
import { ShowsComponent } from './shows/shows.component';

import { MoviesService } from './services/movies.service';
import { ShowsService } from './services/shows.service';
import { DeleteShowComponent } from './delete-show/delete-show.component';
import { EditShowComponent } from './edit-show/edit-show.component';
import { HallShowsByDateComponent } from './hall-shows-by-date/hall-shows-by-date.component';
import { CreateNewShowsComponent } from './create-new-shows/create-new-shows.component';

@NgModule({
  declarations: [
    AppComponent,
    AddShowComponent,
    SearchMovieComponent,
    ShowsComponent,
    DeleteShowComponent,
    EditShowComponent,
    HallShowsByDateComponent,
    CreateNewShowsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatDividerModule,
    MatSelectModule,
    MatPaginatorModule,
    MatGridListModule,
    ToastrModule.forRoot(),
    ToastContainerModule,
    LoadingBarHttpClientModule,
    LoadingBarModule,
  ],
  providers: [MoviesService, ShowsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
