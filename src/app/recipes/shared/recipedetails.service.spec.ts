import { TestBed, inject } from '@angular/core/testing';

import { RecipedetailsService } from './recipedetails.service';

describe('RecipedetailsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecipedetailsService]
    });
  });

  it('should be created', inject([RecipedetailsService], (service: RecipedetailsService) => {
    expect(service).toBeTruthy();
  }));
});
