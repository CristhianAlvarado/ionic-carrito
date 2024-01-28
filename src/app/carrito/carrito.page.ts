import { Component, OnInit } from '@angular/core';
import { itemCarrito } from '../models/itemCarrito';
import { ProductoService } from '../services/producto.service';
import { ToastController } from '@ionic/angular';
@Component({
selector: 'app-carrito',
templateUrl: './carrito.page.html',
styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {

  listaItemsCarrito:itemCarrito[] | undefined;

  public total=0;

  constructor(private productoService: ProductoService, private toast: ToastController) { }

  ngOnInit() {
    this.MuestraCarrito();
  }
  VaciarCarrito(){
    localStorage.clear();
    this.listaItemsCarrito=[];
    this.total = 0;
  }
  eliminarProductoCarrito(i:number){
    let carritoStorage=localStorage.getItem("carrito") as string;
    let carrito=JSON.parse(carritoStorage);
    carrito.splice(i,1);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    this.MuestraCarrito();
  }
  MuestraCarrito(){
    let carritoStorage=localStorage.getItem("carrito") as string;
    let carrito=JSON.parse(carritoStorage);
    if (!Array.isArray(carrito) || carrito.length === 0) {
      return
    }
    this.listaItemsCarrito=carrito;
    this.TotalCarrito();
  }
  TotalCarrito(){
    let carritoStorage=localStorage.getItem("carrito") as string;
    let carrito=JSON.parse(carritoStorage);
    let suma = 0;

    if (!Array.isArray(carrito) || carrito.length === 0) {
      return
    }

    for (var i = 0; i < carrito.length; i++){
      suma += carrito[i].precio*carrito[i].cantidad;
    }
    this.total = suma;
  }

  async ConfirmarCarrito(){
    let carritoStorage=localStorage.getItem("carrito") as string;
    let carrito = JSON.parse(carritoStorage);

    if (!Array.isArray(carrito) || carrito.length === 0) {
      const toastController = await this.toast.create({
        message: 'El carrito está vacio',
        duration: 1500,
        position: 'top',
        color: 'danger',

      })
      await toastController.present()
      return
    }

    this.productoService.GuardarCarrito(carrito).subscribe(async (res: any) => {
      this.VaciarCarrito();
      const data = res;
      const toastController = await this.toast.create({
        message: data.message,
        duration: 1500,
        position: 'top',
        color: 'success',

      })

      await toastController.present()
    })
  }
}
  