import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadochoferComponent } from './listadochofer.component';

describe('ListadochoferComponent', () => {
  let component: ListadochoferComponent;
  let fixture: ComponentFixture<ListadochoferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadochoferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadochoferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
