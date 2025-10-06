import { TestBed } from '@angular/core/testing';

import { CrudExamen } from './crud-examen';

describe('CrudExamen', () => {
  let service: CrudExamen;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudExamen);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
