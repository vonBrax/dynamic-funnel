import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SvgCornerComponent } from './svg-corner.component';

describe('SvgCornerComponent', () => {
  let component: SvgCornerComponent;
  let fixture: ComponentFixture<SvgCornerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SvgCornerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SvgCornerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
