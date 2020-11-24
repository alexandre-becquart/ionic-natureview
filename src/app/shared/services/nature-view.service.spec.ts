import { TestBed } from '@angular/core/testing';

import { NatureViewService } from './nature-view.service';

describe('NatureViewService', () => {
  let service: NatureViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NatureViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
