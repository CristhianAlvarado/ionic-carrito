import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../models/producto';
import { Carrito } from '../models/carrito';
import { itemCarrito } from '../models/itemCarrito';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private url="http://localhost:8081/backcarrito/public/api/productos"
  constructor(private http:HttpClient) { }

  ObtenerTodos(){
    return this.http.get<Producto>(this.url);
  }

  GuardarCarrito(carrito: itemCarrito[]){
    console.log(carrito)
    return this.http.post(this.url, carrito);
  }
}
