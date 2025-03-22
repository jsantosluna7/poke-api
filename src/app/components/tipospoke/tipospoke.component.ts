import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormatService } from '../../services/format.service';
import { register } from 'swiper/element/bundle';
import { catchError, of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
register();

@Component({
  selector: 'app-tipospoke',
  imports: [],
  templateUrl: './tipospoke.component.html',
  styleUrl: './tipospoke.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TipospokeComponent implements OnInit {
  slides = [
    {
      name: 'bug',
      img: 'img/types/bug.svg',
    },
    {
      name: 'dark',
      img: 'img/types/dark.svg',
    },
    {
      name: 'dragon',
      img: 'img/types/dragon.svg',
    },
    {
      name: 'electric',
      img: 'img/types/electric.svg',
    },
    {
      name: 'fairy',
      img: 'img/types/fairy.svg',
    },
    {
      name: 'fighting',
      img: 'img/types/fighting.svg',
    },
    {
      name: 'fire',
      img: 'img/types/fire.svg',
    },
    {
      name: 'flying',
      img: 'img/types/flying.svg',
    },
    {
      name: 'ghost',
      img: 'img/types/ghost.svg',
    },
    {
      name: 'grass',
      img: 'img/types/grass.svg',
    },
    {
      name: 'ground',
      img: 'img/types/ground.svg',
    },
    {
      name: 'ice',
      img: 'img/types/ice.svg',
    },
    {
      name: 'normal',
      img: 'img/types/normal.svg',
    },
    {
      name: 'poison',
      img: 'img/types/poison.svg',
    },
    {
      name: 'psychic',
      img: 'img/types/psychic.svg',
    },
    {
      name: 'rock',
      img: 'img/types/rock.svg',
    },
    {
      name: 'steel',
      img: 'img/types/steel.svg',
    },
    {
      name: 'water',
      img: 'img/types/water.svg',
    },
  ];

  pokemons: any[] = [];
  stats: any[] = [];
  selectedPokemon: any = null;

  constructor(
    private pokemonService: PokemonService,
    private http: HttpClient,
    private format: FormatService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.allPokemon();
  }

  allPokemon() {}

  selectPokemon(pokemon: any): void {
    this.selectedPokemon = pokemon;
  }

  formatW(number: number) {
    return this.format.formatWidth(number);
  }

  pokeTypes(pokemon: string) {
    this.pokemonService
      .getAllTypes(pokemon)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 404) {
            this.toastr.error(
              'No se puedo obtener el tipo, o no existe',
              'error'
            );
          } else {
            this.toastr.error(error.message);
          }
          return of(null);
        })
      )
      .subscribe((data: any) => {
        this.pokemons = [];
        data.pokemon.forEach((x: any) => {
          const pokemonURL = x.pokemon.url;
          this.http.get(pokemonURL).subscribe( (e: any) => {
            const pokeDamage: any[] = []
            this.pokemons.push(
              {
                name: e.name,
                img: e.sprites.other['official-artwork'].front_default,
                height: this.format.formatHeight(e.height),
                weight: this.format.formatWeight(e.weight),
                colorType: e.types[0].type.name,
                types: e.types,
                stats: e.stats,
                damage: pokeDamage
              }
            )

            e.types.forEach((type: any) => {
              const typeURL = type.type.url;
              this.http.get(typeURL).subscribe((damage: any) => {
                const from = damage.damage_relations.double_damage_from;
                from.forEach((element: any) => {
                  pokeDamage.push(
                    {
                      name: element.name
                    }
                  )
                });
              })
            });
          })
        });
      });
  }
}
