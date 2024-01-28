import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../services/producto.service';
import { Producto } from '../models/producto';
import { Router } from '@angular/router';
import { itemCarrito } from '../models/itemCarrito';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.page.html',
  styleUrls: ['./catalogo.page.scss'],
})
export class CatalogoPage implements OnInit {

  productos: Producto[] | undefined;
  quantity: number;

  constructor(private productoSetvide:ProductoService, private roter: Router, private toast: ToastController) { }

  ngOnInit() {
    this.productoSetvide.ObtenerTodos().subscribe((resp:any) =>
    {
      this.productos=resp;
    })
  }

  async addCarrito(producto: any) {
    let iCarrito:itemCarrito={
      idproducto:producto.idproducto,
      descripcion:producto.descripcion,
      precio:producto.precio,
      cantidad:1
    }

    if(localStorage.getItem("carrito")===null)
    {
      let carrito:itemCarrito[]=[];
      carrito.push(iCarrito);
      localStorage.setItem("carrito", JSON.stringify(carrito))
    }
    else{
      let carritoStorage=localStorage.getItem("carrito") as string;
      let carrito=JSON.parse(carritoStorage);
      let index = -1;
      for(let i=0;i<carrito.length;i++)
      {
        let filaC:itemCarrito=carrito[i];
        if (iCarrito.idproducto === filaC.idproducto){
          index = i;
          break;
        }
      }
      if (index === -1){
        carrito.push(iCarrito);
        localStorage.setItem("carrito", JSON.stringify(carrito))
      }
      else {
        let itemcarrito:itemCarrito=carrito[index];
        itemcarrito.cantidad!++;
        carrito[index] = itemcarrito;
        localStorage.setItem("carrito", JSON.stringify(carrito))
      }
    }
    const toastController = await this.toast.create({
      message: 'Agregado al carrito',
      duration: 1500,
      position: 'top',
      color: 'success',

    })
    await toastController.present()
  }
    

}
