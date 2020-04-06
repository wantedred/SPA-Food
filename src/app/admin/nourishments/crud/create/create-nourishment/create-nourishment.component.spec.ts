import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNourishmentComponent } from './create-nourishment.component';

describe('CreateNourishmentComponent', () => {
  let component: CreateNourishmentComponent;
  let fixture: ComponentFixture<CreateNourishmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNourishmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNourishmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
