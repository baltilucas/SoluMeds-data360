import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreadorPacientePage } from './creador-paciente.page';

describe('CreadorPacientePage', () => {
  let component: CreadorPacientePage;
  let fixture: ComponentFixture<CreadorPacientePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CreadorPacientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
