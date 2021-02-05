import { TestBed } from '@angular/core/testing';

import { RestriccionGuard } from './restriccion.guard';

describe('RestriccionGuard', () => {
  let guard: RestriccionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RestriccionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
