import { TestBed } from '@angular/core/testing';

import { MathOprationsService } from './math-oprations.service';

describe('MathOprationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MathOprationsService = TestBed.get(MathOprationsService);
    expect(service).toBeTruthy();
  });
});
