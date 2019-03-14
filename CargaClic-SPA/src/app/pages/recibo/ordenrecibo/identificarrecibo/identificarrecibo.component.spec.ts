import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentificarreciboComponent } from './identificarrecibo.component';

describe('IdentificarreciboComponent', () => {
  let component: IdentificarreciboComponent;
  let fixture: ComponentFixture<IdentificarreciboComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdentificarreciboComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentificarreciboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
