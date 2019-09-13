import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {

  heroes$: Observable<Hero[]>;
  // Subject는 옵저버블 의 소스로 사용되기도 하지만 그 자체로 Observable.
  // Subject 객체는 따라서 구독할 수 있다.
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      // 연속된 키입력을 처리하기 위해 300ms 대기(요청은 300ms에 하나로 제한)
      debounceTime(300),
      // 입력한 문자열의 내용이 변경되었을 때만 옵저버블 스트림을 전달
      distinctUntilChanged(),
      // 검색어가 변경되면 새로운 옵저버블을 생성
      switchMap((term: string) => 
        this.heroService.searchHeroes(term)),
    );
  }

   // 사용자가 입력한 검색어를 옵저버블 스트림으로 보냄
  search(term: string):void {
    // Subject 객체가 제공하는 next(value) 메소드를 사용하면 Observable로 데이터를 보낼 수 있다.
    this.searchTerms.next(term);
  }

}
