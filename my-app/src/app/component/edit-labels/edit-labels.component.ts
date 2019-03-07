import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/core/services/note.service';
import { MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-labels',
  templateUrl: './edit-labels.component.html',
  styleUrls: ['./edit-labels.component.css']
})
export class EditLabelsComponent implements OnInit {
  createLabels: FormGroup;
    value = '';
    submitted = false;
    token = localStorage.getItem('token')
  
  constructor(private noteservice: NoteService,private formBuilder: FormBuilder,private snackbar: MatSnackBar) { }

  ngOnInit() {
    this.createLabels= this.formBuilder.group({
    labelName: ['', Validators.required]
  });
  }

  createLabel(label) {
    this.submitted = true;
    console.log(this.token);
    console.log(label);
    this.noteservice.createLabel(label).subscribe(response => {
      this.snackbar.open("label has been created successfully", "OK", {
        duration: 2000
      });
    })
  }
}
