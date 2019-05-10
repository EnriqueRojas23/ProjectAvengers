import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoproveedorComponent } from './listadoproveedor.component';

describe('ListadoproveedorComponent', () => {
  let component: ListadoproveedorComponent;
  let fixture: ComponentFixture<ListadoproveedorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoproveedorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoproveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
