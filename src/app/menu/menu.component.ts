import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  //atributos
  isAuthenticated: boolean = false;
  nomeUsuario: string = '';
  emailUsuario: string = '';

  //função executada no momento em q o componente for inicializado
ngOnInit(){

  //buscar dados do usuario logado
  var data = localStorage.getItem('agendaapp');

  //verifica se algum usuario logado
  if(data != null){
    this.isAuthenticated = true;
    this.nomeUsuario = JSON.parse(data).nome;
    this.emailUsuario = JSON.parse(data).email;
  }
}

//função logout
logout() {
  if(confirm('Deseja realemnte sair do sistema?')){
    localStorage.removeItem('agendaapp'); //apaga dados da local storage
    location.href = '/'; //redireciona para a raiz do projeto
  }
}
}
