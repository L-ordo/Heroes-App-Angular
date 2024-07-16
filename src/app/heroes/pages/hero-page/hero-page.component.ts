import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heros.service';
import { ActivatedRoute, Router } from '@angular/router';
import {  switchMap } from 'rxjs';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styles: [
  ]
})
export class HeroPageComponent implements OnInit{

  public hero?: Hero;

  constructor(
     private heroesService: HeroesService,
     private activatedRoute: ActivatedRoute,
     private router:Router
    ){}

  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(

      // delay(3000),
        switchMap( ({ id }) => this.heroesService.getHeroById( id ) )
    ).subscribe( hero =>{
      // si ingresan un heroe que no existe se regresa a la pantalla lista de heroes
        if( !hero ) return this.router.navigate([ '/heroes/list' ]);

        // Si existe extrae los datos del heroe
        this.hero = hero;
        return
    });
  }
  // creamos metodo para button para navegar a url deseada
  goBack(){
      this.router.navigateByUrl('heroes/list')
  }

}
