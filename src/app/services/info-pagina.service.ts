import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { InfoPagina } from '../interfaces/info-pagina.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

info : InfoPagina={};
cargada =false;

equipo: any[]=[]

  constructor( private http: HttpClient) {
    this.CargarInfo();
    this.CargarEquipo();
  }


private CargarInfo(){

  this.http.get('assets/data/data-pagina.json')
  .subscribe((resp:InfoPagina) => {

    this.cargada= true;
    this.info= resp;    
  })
}

private CargarEquipo(){

  this.http.get('https://angular-html-f99a9.firebaseio.com/.json')
  .subscribe((resp:any) => {

    this.cargada= true;
    this.equipo= resp;
    //console.log(resp);
  })
}


}
