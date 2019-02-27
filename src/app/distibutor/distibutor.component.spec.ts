import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistibutorComponent } from './distibutor.component';

describe('DistibutorComponent', () => {
  let component: DistibutorComponent;
  let fixture: ComponentFixture<DistibutorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistibutorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistibutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
