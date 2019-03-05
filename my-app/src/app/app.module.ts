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
    TrashNoteComponent
   

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppMaterialModule
  ],
  entryComponents:[UpdateNoteComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
