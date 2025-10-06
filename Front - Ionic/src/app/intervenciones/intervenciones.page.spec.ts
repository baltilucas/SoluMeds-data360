import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IntervencionesPage } from './intervenciones.page';

describe('IntervencionesPage', () => {
  let component: IntervencionesPage;
  let fixture: ComponentFixture<IntervencionesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(IntervencionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
