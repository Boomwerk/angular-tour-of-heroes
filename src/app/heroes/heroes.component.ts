import { Component, OnInit } from '@angular/core';
import {Hero} from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
 
  heroes: Hero [] =[];
  selectedHero?: Hero;
  
  
  constructor(private heroservice: HeroService, private messageservice: MessageService) {}


  ngOnInit(): void {
    this.getheroes();
  }

  getheroes(): void
  {
    this.heroservice.getHeroes().subscribe(heroes => this.heroes = heroes);
  }

  add(name : string):void
  {
    name = name.trim();
    if(!name) { return;}
    this.heroservice.addHero({name} as Hero)
    .subscribe(hero => {
       this.heroes.push(hero);
      });
  }

  deleteHero(hero: Hero): void
  {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroservice.deleteHero(hero.id).subscribe();
  }
  
  // on a plus besoin de cette fonction car ont passe par l'url pour selectionné un hero ont peut donc le supprimé
  // onSelect(hero: Hero): void
  // {

  //   this.selectedHero = hero;
  //   this.messageservice.add(`HeroesComponent: Selected hero id=${hero.id}`);
  // }

}
