import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { environments } from 'src/environments/environments';

@Injectable({providedIn: 'root'})
export class HeroesService {


 //Llamamos a nuestra variable de entorno
  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) { }


  getHeroes():Observable<Hero[]>{
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes`);
  }

  // Usamos el obsevable para ver si existe el heroe o no existe
  getHeroById( id: string ): Observable<Hero | undefined>{

    return this.http.get<Hero>(`${this.baseUrl}/heroes/${id}`)
    .pipe(//El "of" es para que identifique que es un observable
      catchError( error => of(undefined) )
    );
  }


  // Servicio para buscar por nombre o id

  getSuggestions( query: string ): Observable<Hero[]>{
    return this.http.get<Hero[]>(`${ this.baseUrl }/heroes?q=${ query }&_limit=6`);
  }

  // Agregamos un nuevo heroe
  addHero( hero: Hero ): Observable<Hero>{
    return this.http.post<Hero>(`${ this.baseUrl }/heroes`, hero );
  }

  // Actulizamos un
  updateHero( hero: Hero ): Observable<Hero>{
    // Si el Id no existe
    if( !hero.id) throw Error('Hero id is required');
    return this.http.patch<Hero>(`${ this.baseUrl }/heroes/${ hero.id }`, hero );
  }


  // Eliminar un heroe
  deleteeHeroById( id: string ): Observable<boolean>{
    // Si el Id no existe
    if( !id) throw Error('Hero id is required');
    return this.http.delete(`${ this.baseUrl }/heroes/${ id }`)
    .pipe(
      map( resp => true ) ,// si sale exitosa retorna un boolean
      catchError( err => of(false) ),
    );
   }

}
