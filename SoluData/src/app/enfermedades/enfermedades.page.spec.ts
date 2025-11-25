import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EnfermedadesPage } from './enfermedades.page';

describe('EnfermedadesPage', () => {
  let component: EnfermedadesPage;
  let fixture: ComponentFixture<EnfermedadesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EnfermedadesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
