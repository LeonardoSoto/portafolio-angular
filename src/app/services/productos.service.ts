import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  productos: Producto[]=[];
  cargando=true;
  constructor(private http: HttpClient) { 
    this.CargarProcutos();
  }

  private CargarProcutos(){

    
    this.http.get('https://angular-html-f99a9.firebaseio.com/productos_idx.json')
    .subscribe((resp:Producto[]) => {
  
      this.productos=resp;
      console.log(resp);
      

      setTimeout(()=>{
        this.cargando=false;
      },2000);
      
    })
  }
  



}





