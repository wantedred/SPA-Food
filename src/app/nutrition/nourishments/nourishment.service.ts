import { Injectable } from '@angular/core';
import { CacheService } from 'src/app/caching/cache.service';

@Injectable({
  providedIn: 'root'
})
export class NourishmentService {

  
  constructor(cacheService: CacheService) { 

  }

  public search(category, query) {
    
  }

}
