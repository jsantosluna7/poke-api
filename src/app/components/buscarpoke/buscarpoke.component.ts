import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormatService } from '../../services/format.service';
import { catchError, of } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ObtenerpokeComponent } from '../obtenerpoke/obtenerpoke.component';
import { ToastrService } from 'ngx-toastr';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-buscarpoke',
  imports: [ReactiveFormsModule, ObtenerpokeComponent, ModalComponent],
  templateUrl: './buscarpoke.component.html',
  styleUrl: './buscarpoke.component.css',
})
export class BuscarpokeComponent implements OnInit {
  pokeForm: FormGroup;
  pokemones: any;
  id: string = 'pokeCard';
  name: string = '';
  img: string = '';
  height: string = '';
  weight: string = '';
  types: any[] = [];
  colorType: string = '';
  stats: any[] = [];
  debilities: any[] = [];

  constructor(
    private pokemonService: PokemonService,
    private format: FormatService,
    private toastr: ToastrService,
    private http: HttpClient
  ) {
    this.pokeForm = new FormGroup({
      pokemon: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  pokemonSearch() {
    if (this.pokeForm.valid) {
      this.types = [];
      this.stats = [];
      this.debilities = [];
      
      this.pokemonService
        .searchPokemon(this.pokeForm.value.pokemon)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            if (error.status === 404) {
              this.toastr.error('No se encontró el pokemon digitado', 'Error')
              this.pokemones = undefined;
              this.name = '';
              this.img = '';
              this.height = '';
              this.weight = '';
              this.types = [];
              this.colorType = '';
              this.stats = [];
              this.debilities = [];
            } else {
              this.toastr.error(error.message);
            }
            return of(null);
          })
        )
        .subscribe({
          next: (data: any) => {
            data.stats.forEach((e: any) => {
              this.stats.push({
                name: e.stat.name,
                base_stat: e.base_stat,
                widthPercent: this.format.formatWidth(e.base_stat)
              });
            });

            this.pokemones = data;
            this.name = data.name;
            this.img = data.sprites.other['official-artwork'].front_default;
            this.height = this.format.formatHeight(data.height);
            this.weight = this.format.formatWeight(data.weight);
            this.types.push(data.types);
            this.colorType = data.types[0].type.name;

            data.types.forEach((type: any) => {
              const typeURL = type.type.url;
              this.http.get(typeURL).subscribe((damage: any) => {
                const from = damage.damage_relations.double_damage_from;
                from.forEach((element: any) => {
                  this.debilities.push(
                    {
                      name: element.name
                    }
                  )
                });
              })
            });
          },
          error: (error) => {
            console.error('Error al obtener el pokemon', error);
          },
        });
    } else console.error('Formulario Invalido');
  }
}
