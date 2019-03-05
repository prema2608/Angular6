import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegistrationComponent } from './component/registration/registration.component';
import { HomeComponent } from 'src/app/component/home/home.component';
import { CreateNoteComponent } from './component/create-note/create-note.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  {
    path: 'home', component: HomeComponent, children:
      [
        {path: 'create-note', component: CreateNoteComponent},
        {path: '', redirectTo:'create-note' ,pathMatch:'full'},

      ]
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
