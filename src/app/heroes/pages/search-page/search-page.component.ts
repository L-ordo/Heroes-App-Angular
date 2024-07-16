import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heros.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: [
  ]
})
export class SearchPageComponent {

  public searchInput = new FormControl('');
  public heroes: Hero[] = [];
  // Se le pone el "?" para que sea opcional
  public selectedHero?: Hero;

  constructor( private heroesService : HeroesService ){}


  searchHero(){
    const value: string = this.searchInput.value || '';

    this.heroesService.getSuggestions( value )
    .subscribe( heroes =>  this.heroes = heroes );


  }

  // se pone void cuando no va a regresar nada
  onSelectedOption( event: MatAutocompleteSelectedEvent ):void{
      // Si el option.vale existe
    if( !event.option.value){
      this.selectedHero = undefined;
      return;
    }

    const hero: Hero = event.option.value;
    this.searchInput.setValue( hero.superhero );

    this.selectedHero = hero;

  }

}
