import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  randomId = Math.floor(Math.random() * 151) + 1;

  private get: string = `https://pokeapi.co/api/v2/pokemon/${this.randomId}`;
  private list: string = 'https://pokeapi.co/api/v2/type/';
  private search: string = 'https://pokeapi.co/api/v2/pokemon/'

  constructor(private http: HttpClient) {}

  public getPokemon(): Observable<any> {
    return this.http.get(this.get);
  }

  public getAllTypes(pokemon: string): Observable<any> {
    return this.http.get(this.list + pokemon);
  }

  public searchPokemon(pokemon: string): Observable<any> {
    return this.http.get(this.search + pokemon);
  }
}
