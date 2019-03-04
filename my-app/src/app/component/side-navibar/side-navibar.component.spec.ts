import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavibarComponent } from './side-navibar.component';

describe('SideNavibarComponent', () => {
  let component: SideNavibarComponent;
  let fixture: ComponentFixture<SideNavibarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideNavibarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideNavibarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
