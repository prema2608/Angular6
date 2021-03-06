import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegistrationComponent } from './component/registration/registration.component';
import { HomeComponent } from 'src/app/component/home/home.component';
import { CreateNoteComponent } from './component/create-note/create-note.component';
import { TrashNoteComponent } from './component/trash-note/trash-note.component';
import { ArchiveNoteComponent } from './component/archive-note/archive-note.component';
import { EditLabelsComponent } from './component/edit-labels/edit-labels.component';
import { ViewnoteComponent } from './component/viewnote/viewnote.component';
import { SearchComponent } from './component/search/search.component';
import { ReminderComponent } from './component/reminder/reminder.component';
import { LabelDisplayComponent } from './component/label-display/label-display.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  {
    path: 'home', component: HomeComponent, children:
      [
        {path: 'viewnote', component: ViewnoteComponent},
        {path: '', redirectTo:'viewnote' ,pathMatch:'full'},
        {path: 'trash', component: TrashNoteComponent},
        { path: 'archive-note',component:ArchiveNoteComponent},
        {path:'edit-labels',component:EditLabelsComponent},
        {path: 'search', component: SearchComponent},
        {path:'reminder',component:ReminderComponent},
        {path:'label-display/:labelName',component:LabelDisplayComponent}
      ]
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
