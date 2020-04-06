import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NourishmentDetailsComponent } from './nourishment-details.component';

describe('NourishmentDetailsComponent', () => {
  let component: NourishmentDetailsComponent;
  let fixture: ComponentFixture<NourishmentDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NourishmentDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NourishmentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
