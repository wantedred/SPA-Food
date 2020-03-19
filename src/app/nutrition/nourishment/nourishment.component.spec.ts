import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NourishmentComponent } from './nourishment.component';

describe('NourishmentComponent', () => {
  let component: NourishmentComponent;
  let fixture: ComponentFixture<NourishmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NourishmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NourishmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
