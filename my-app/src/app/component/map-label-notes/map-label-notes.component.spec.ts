import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapLabelNotesComponent } from './map-label-notes.component';

describe('MapLabelNotesComponent', () => {
  let component: MapLabelNotesComponent;
  let fixture: ComponentFixture<MapLabelNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapLabelNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapLabelNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
