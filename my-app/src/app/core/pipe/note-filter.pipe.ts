import { Pipe, PipeTransform } from '@angular/core';
import { Note } from '../models/note';

@Pipe({
  name: 'noteFilter'
})
export class NoteFilterPipe implements PipeTransform {

  transform(notes: Note[], valid = ''): Note[] {
    if (!valid) {
      return notes.filter((note) => {
        if (!note.archive && !note.inTrash) {
          return note;
        }
      });
    }
  }
}
