import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatospacientePage } from './datospaciente.page';

describe('DatospacientePage', () => {
  let component: DatospacientePage;
  let fixture: ComponentFixture<DatospacientePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DatospacientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
