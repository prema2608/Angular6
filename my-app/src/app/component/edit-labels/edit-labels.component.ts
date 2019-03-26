import { Component, OnInit, Inject } from '@angular/core';
import { NoteService } from 'src/app/core/services/note.service';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { labels } from 'src/app/core/models/labels';
import { DialogData } from '../list-of-notes/list-of-notes.component';

@Component({
  selector: 'app-edit-labels',
  templateUrl: './edit-labels.component.html',
  styleUrls: ['./edit-labels.component.css']
})
export class EditLabelsComponent implements OnInit {
  
  value = '';
  submitted = false;
  token = localStorage.getItem('token')

  constructor(private service: NoteService, private snackbar: MatSnackBar,
    public dialogRef: MatDialogRef<EditLabelsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  labels: labels[] = [];
  
  ngOnInit() {
    this.retriveLabels();
  }

  onClose(){
    this.dialogRef.close();
  }
        

  closeClick() {
    this.dialogRef.close();
  }
public retriveLabels() {
  this.service.retriveLabels().subscribe((newlabel: any) => {
    this.labels= newlabel;
  },
    (error) => {
      console.log("invalid");
    });
}

public updateLabels(label, labelName){
  var name = labelName.innerHTML;
  var newLabel =
  {
    ...label,
    "labelName": name
  }
  this.service.updateLabel(newLabel).subscribe(response => {
    this.ngOnInit();
    this.retriveLabels();
    this.snackbar.open("Label Updated Successfully", "OK", {
      duration: 3000,
    });
  },
    (error) => {
      console.log(error);
      this.snackbar.open("Label Updation Failed", "OK", {
        duration: 3000,
      });
    })
}


public deleteLabels(labelId){
  this.service.deleteLabels(labelId).subscribe(response => {
    this.ngOnInit();
    this.snackbar.open("Label Deleted Successfully", "OK", {
      duration: 3000,
    });
  },
    (error) => {
      console.log(error);
      this.snackbar.open("Label Deletion Failed", "OK", {
        duration: 3000,
      });
    })
}
  createLabels(label) {
    console.log(label);
    const newLabel =
    {
      "labelName": label
    }
    this.service.createLabels(newLabel).subscribe(response => {
      this.retriveLabels();
      this.snackbar.open("label has been created successfully", "OK", {
        duration: 2000
      });
    })
  }
}
       




































// import { Component, OnInit, Inject } from '@angular/core';
// import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
// import { labels } from 'src/app/core/models/labels';
// import { NoteService } from 'src/app/core/services/note.service';

// @Component({
//   selector: 'app-edit-labels',
//   templateUrl: './edit-labels.component.html',
//   styleUrls: ['./edit-labels.component.css']
// })
// export class EditLabelsComponent implements OnInit {

//   public labels:labels[]=[];

//   constructor(public dialogRef: MatDialogRef<EditLabelsComponent>,
//     @Inject(MAT_DIALOG_DATA) public data, private service: NoteService,
//     private snackBar: MatSnackBar) { }

//   ngOnInit() {
//     this.retriveLabels();
//   }




//   public retriveLabels() {
//     this.service.retriveNote().subscribe((newLabel: any) => {
//       this.labels = newLabel;
//     },
//       (error) => {
//         console.log("invalid");
//       });
//   }


//   public closeDailog()
//   {
//     this.dialogRef.close();
//   }


//   updateLabels(note, noteId) {
//     //  console.log(note);
//     const newLabel=
//     {
//       ...labels,
//       labelName : name
//     }
//     this.service.updateNote(note, noteId).subscribe(response => {
//       console.log("updated");
//     })
//   }

//   // public updateLabels(label,labelName)
//   // {
//   //   const name=labelName.innerHTML;
//   //   console.log(name);
//   //   const newLabel=
//   //   {
//   //     ...label,
//   //     labelName : name
//   //   }
//   //   this.service.updateLabels(newLabel,newLabel.labelId).subscribe(response => {
//   //     this.retriveLabels();
//   //     this.snackBar.open("label updated", "Ok", { duration: 2000 });
//   //   }, error => {
//   //     this.snackBar.open("error", "error to update labels", { duration: 2000 });
//   //   }
//   //   )
//   // }

//   public deleteLabels(label)
//   {
//     this.service.deleteLabels(label.labelId).subscribe(response => {
//       this.retriveLabels();
//       this.snackBar.open("label deleted", "Ok", { duration: 2000 });
//     }, error => {
//       this.snackBar.open("error", "error to delete labels", { duration: 2000 });
//     }
//     )
//   }

//   public createLabels(labelName)
//   {
//     const name=labelName.innerHTML;
//     const label=
//     {
//       labelName:name
//     }
//     this.service.createLabels(label).subscribe(response => {
//       this.retriveLabels();
//       this.snackBar.open("label created", "Ok", { duration: 2000 });
//     }, error => {
//       this.snackBar.open("error", "error to create labels", { duration: 2000 });
//     }
//     )
//   }
// }


// //   
