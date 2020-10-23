import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  productos: Producto[] = [];
  cargando = true;
  productosFiltrado: Producto[] = [];

  constructor(private http: HttpClient) {
    this.CargarProdutos();
  }

  private CargarProdutos() {
    return new Promise((resolve, reject) => {
      this.http
        .get('https://angular-html-f99a9.firebaseio.com/productos_idx.json')
        .subscribe((resp: Producto[]) => {
          this.productos = resp;          
          setTimeout(()=>{
            this.cargando=false;
            resolve();
          },2000);
        });
    });
  }

  GetProducto(id: string) {
    return this.http.get(
      `https://angular-html-f99a9.firebaseio.com/productos/${id}.json`
    );
  }

  buscarProducto(termino: string) {
    if (this.productos.length === 0) {
      //cargar productos
      this.CargarProdutos().then(() => {
        //ejecutar despues de tener los procutos
        //aplicar filtro
        this.filtrarProductos(termino);
      });
    } else {
      //aplicar fittro
      this.filtrarProductos(termino);
    }
  }

  private filtrarProductos(termino: string) {
    this.productosFiltrado = [];

    termino = termino.toLowerCase();

    this.productos.forEach((prod) => {
      const tituloLower = prod.titulo.toLocaleLowerCase();
      if (
        prod.categoria.indexOf(termino) >= 0 ||
        tituloLower.indexOf(termino) >= 0
      ) {
        this.productosFiltrado.push(prod);
      }
    });
  }
}
