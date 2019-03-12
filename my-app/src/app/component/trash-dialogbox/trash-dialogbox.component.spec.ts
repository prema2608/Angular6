import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrashDialogboxComponent } from './trash-dialogbox.component';

describe('TrashDialogboxComponent', () => {
  let component: TrashDialogboxComponent;
  let fixture: ComponentFixture<TrashDialogboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrashDialogboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrashDialogboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
