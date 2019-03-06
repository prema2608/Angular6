import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegistrationComponent } from './component/registration/registration.component';
import { HomeComponent } from 'src/app/component/home/home.component';
import { CreateNoteComponent } from './component/create-note/create-note.component';
import { TryCatchStmt } from '@angular/compiler';
import { TrashNoteComponent } from './component/trash-note/trash-note.component';
import { ArchiveNoteComponent } from './component/archive-note/archive-note.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  {
    path: 'home', component: HomeComponent, children:
      [
        {path: 'create-note', component: CreateNoteComponent},
        {path: '', redirectTo:'create-note' ,pathMatch:'full'},
        {path: 'trash', component: TrashNoteComponent},
        { path: 'archive-note',component:ArchiveNoteComponent}
      ]
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
