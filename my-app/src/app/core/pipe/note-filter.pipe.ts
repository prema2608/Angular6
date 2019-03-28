import { Pipe, PipeTransform } from '@angular/core';
import { Note } from '../models/note';

@Pipe({
  name: 'noteFilter'
})
export class NoteFilterPipe implements PipeTransform {

  transform(notes: Note[], valid = ''): Note[] {
    if (!valid) {
      return notes.filter((item) => {
        if (!item.archive && !item.inTrash && !item.pinned) {
          return item;
        }
      });
    }
    else if (valid === 'archive') {
      return notes.filter((item) => {
        if (item.archive && !item.inTrash && !item.pinned) {
          return item;
        }
      });
    }
    else if (valid === 'pinned') {
      return notes.filter((item) => {
        if (!item.inTrash && item.pinned && !item.archive) {
          return item;
        }
      });
    }
    else if (valid === 'inTrash') {
      return notes.filter((item) => {
        if (item.inTrash) {
          return item;
        }
      });
    }
    else if (valid === 'remainder') {
      return notes.filter((item) => {
        if (!item.inTrash && item.remainder) {
          return item;
        }
      });
    }
    return null;

  }
}
