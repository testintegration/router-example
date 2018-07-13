
import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators'; //to process the Observable route parameters
import { Hero, HeroService } from './hero.service';
import { slideInDownAnimation } from '../animations';

@Component({
  templateUrl: './hero-detail.component.html',
  animations: [ slideInDownAnimation ]
})
export class HeroDetailComponent implements OnInit {
  // slideInDownAnimation's trigger
  @HostBinding('@routeAnimation') routeAnimation = true;
  @HostBinding('style.display')   display = 'block';
  @HostBinding('style.position')  position = 'absolute';

  hero$: Observable<Hero>;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: HeroService
  ) {}

  ngOnInit() {//ActivatedRoute is better, no need to unsubscribe when the component is destroyed.
      this.hero$ = this.route.paramMap.pipe( // AsyncPipe
        switchMap((params: ParamMap) => //observable ParamMap
          this.service.getHero(params.get('id')))
    );//the HeroService returns an Observable<Hero>. So you flatten the Observable with the switchMap operator instead.
  }

  gotoHeroes(hero: Hero) {
    let heroId = hero ? hero.id : null;
    // Pass along the hero id if available
    // so that the HeroList component can select that hero.
    // Include a junk 'foo' property for fun.
    this.router.navigate(['/heroes', { id: heroId, foo: 'foo' }]);
  }

}
