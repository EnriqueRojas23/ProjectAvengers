import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaordenrecibidaComponent } from './listaordenrecibida.component';

describe('ListaordenrecibidaComponent', () => {
  let component: ListaordenrecibidaComponent;
  let fixture: ComponentFixture<ListaordenrecibidaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaordenrecibidaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaordenrecibidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
