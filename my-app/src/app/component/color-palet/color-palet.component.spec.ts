import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorPaletComponent } from './color-palet.component';

describe('ColorPaletComponent', () => {
  let component: ColorPaletComponent;
  let fixture: ComponentFixture<ColorPaletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorPaletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorPaletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
