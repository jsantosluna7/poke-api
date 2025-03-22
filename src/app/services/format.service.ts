import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormatService {

  constructor() { }

  public formatHeight(height: number): any {
    const altura = height.toString();
    if (altura.length == 1) {
      return `0.${height}`;
    } else if (altura.length == 2) {
      const mitad = Math.floor(altura.length / 2);
      const primeraParte = altura.slice(0, mitad);
      const segundaParte = altura.slice(mitad);
      return `${primeraParte}.${segundaParte}`;
    } else {
      const resultado = altura.slice(0, 2);
      return `${resultado}`;
    }
  }

  public formatWeight(weight: number): any {
    const peso = weight.toString();
    if (peso.length == 1) {
      return peso;
    } else if (peso.length == 2) {
      const primero = peso.slice(0, 1);
      const segundo = peso.slice(1);
      if (segundo === '0') {
        return primero;
      } else {
        return `${primero}.${segundo}`;
      }
    } else if (peso.length == 3) {
      const primerosDos = peso.slice(0, 2);
      const ultimoCaracter = peso.slice(2);
      if (ultimoCaracter === '0') {
        return primerosDos;
      } else {
        return `${primerosDos}.${ultimoCaracter}`;
      }
    } else {
      const primerosTres = peso.slice(0, 3);
      const ultimoCaracter = peso.slice(3);
      if (ultimoCaracter === '0') {
        return primerosTres;
      } else {
        return `${primerosTres}.${ultimoCaracter}`;
      }
    }
  }

  public formatWidth(width: number){
    const porcentaje = ((width / 200) * 100).toFixed(1);
    return porcentaje;
  }
}
