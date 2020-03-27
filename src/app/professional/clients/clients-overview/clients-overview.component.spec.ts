import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientsOverviewComponent } from './clients-overview.component';

describe('ClientsOverviewComponent', () => {
  let component: ClientsOverviewComponent;
  let fixture: ComponentFixture<ClientsOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientsOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
