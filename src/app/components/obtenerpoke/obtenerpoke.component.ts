import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { FormatService } from '../../services/format.service';
import { ModalComponent } from '../modal/modal.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-obtenerpoke',
  imports: [ModalComponent],
  templateUrl: './obtenerpoke.component.html',
  styleUrl: './obtenerpoke.component.css',
})
export class ObtenerpokeComponent implements OnInit {
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
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.pokeGet();
  }

  pokeGet() {
    this.pokemonService.getPokemon().subscribe((data: any) => {
      data.stats.forEach((e: any) => {
        this.stats.push({
          name: e.stat.name,
          base_stat: e.base_stat,
          widthPercent: this.format.formatWidth(e.base_stat)
        });
      });
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
    });
  }
}
