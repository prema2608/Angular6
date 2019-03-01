import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpgradeNoteComponent } from './upgrade-note.component';

describe('UpgradeNoteComponent', () => {
  let component: UpgradeNoteComponent;
  let fixture: ComponentFixture<UpgradeNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpgradeNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpgradeNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
