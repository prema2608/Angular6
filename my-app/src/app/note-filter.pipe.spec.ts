import { NoteFilterPipe } from './core/pipe/note-filter.pipe';

describe('NoteFilterPipe', () => {
  it('create an instance', () => {
    const pipe = new NoteFilterPipe();
    expect(pipe).toBeTruthy();
  });
});
