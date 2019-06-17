/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EquipotransportesalidaComponent } from './equipotransportesalida.component';

describe('EquipotransportesalidaComponent', () => {
  let component: EquipotransportesalidaComponent;
  let fixture: ComponentFixture<EquipotransportesalidaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EquipotransportesalidaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipotransportesalidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
