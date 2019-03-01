import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { RegistrationComponent } from './component/registration/registration.component';
import { AppMaterialModule} from './app.material.module';
import { HomeComponent } from 'src/app/component/home/home.component';
import { UpgradeNoteComponent } from 'src/app/component/upgrade-note/upgrade-note.component';
import { ListOfNotesComponent } from './list-of-notes/list-of-notes.component';
import { CreateNoteComponent } from './create-note/create-note.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    HomeComponent,
    UpgradeNoteComponent,
    ListOfNotesComponent,
    CreateNoteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppMaterialModule
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
