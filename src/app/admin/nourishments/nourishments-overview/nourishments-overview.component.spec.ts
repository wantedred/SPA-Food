import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NourishmentsOverviewComponent } from './nourishments-overview.component';

describe('NourishmentsOverviewComponent', () => {
  let component: NourishmentsOverviewComponent;
  let fixture: ComponentFixture<NourishmentsOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NourishmentsOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NourishmentsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
