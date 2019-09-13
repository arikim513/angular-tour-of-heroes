import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  
  heroes: Hero[];
  // selectedHero: Hero;

  constructor(private heroSevice: HeroService) { }
    
  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroSevice.getHeroes().subscribe(
      heroes => this.heroes = heroes);
  }
    
  add(name: string): void {
    name = name.trim();
    if(!name) {return;}
    this.heroSevice.addHero({name} as Hero).subscribe(
      hero => {this.heroes.push(hero)});
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !==hero);
    // subscribe()를 생략하면 서버로 제거 요청을 보내지 않습니다! 
    // 왜냐하면 아무도 구독하지 않은 Observable은 아무 동작도 하지 않기 때문입니다!
    this.heroSevice.deleteHero(hero).subscribe();
  }

  // onSelect(hero: Hero): void {
  //   this.selectedHero = hero;
  // }
}
