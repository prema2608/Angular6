import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { RegistrationComponent } from './component/registration/registration.component';
import { AppMaterialModule} from './app.material.module';
import { HomeComponent } from 'src/app/component/home/home.component';
import{CreateNoteComponent} from 'src/app/component/create-note/create-note.component';
import{ SideNavibarComponent } from './component/side-navibar/side-navibar.component';
import { ListOfNotesComponent } from './component/list-of-notes/list-of-notes.component';
import { UpdateNoteComponent } from './component/update-note/update-note.component';
import { TrashNoteComponent } from './component/trash-note/trash-note.component';
import { ArchiveNoteComponent } from './component/archive-note/archive-note.component';
import { NoteFilterPipe } from './core/pipe/note-filter.pipe';
import { EditLabelsComponent } from './component/edit-labels/edit-labels.component';
import { MapLabelNotesComponent } from './component/map-label-notes/map-label-notes.component';
import { SearchFilterPipe } from './core/pipe/search-filter.pipe';
import { TrashDialogboxComponent } from './component/trash-dialogbox/trash-dialogbox.component';
import { ViewnoteComponent } from './component/viewnote/viewnote.component';
import { SearchComponent } from './component/search/search.component';
import { NoteSearchPipe } from './pipe/note-search.pipe';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    HomeComponent,
    ListOfNotesComponent,
    CreateNoteComponent,
    SideNavibarComponent,
    UpdateNoteComponent,
    TrashNoteComponent,
    ArchiveNoteComponent,
    NoteFilterPipe,
    EditLabelsComponent,
    MapLabelNotesComponent,
    SearchFilterPipe,
    TrashDialogboxComponent,
    ViewnoteComponent,
    SearchComponent,
    NoteSearchPipe,
    
   

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppMaterialModule
  ],
  entryComponents:[UpdateNoteComponent,EditLabelsComponent,TrashDialogboxComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
