import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-autenticar-usuario',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './autenticar-usuario.component.html',
  styleUrl: './autenticar-usuario.component.css'
})
export class AutenticarUsuarioComponent {

      //atributos
      mensagemErro: string = '';
  
    //construtor para injeção de dependencia
    constructor(
      private httpClient: HttpClient
    ){
  
    }
  
  form = new FormGroup({
    email : new FormControl(''),
    senha : new FormControl('')
  })

  onSubmit(){
    this.httpClient.post(environment.apiUsuario + "api/usuarios/autenticar", this.form.value)
    .subscribe({
      next: (data: any) => {
        //salvar informação
        localStorage.setItem('agendaapp', JSON.stringify(data));
        // redirecionar para página
        location.href = '/app/consultar-tarefas';
      },
      error: (e) => { //recebendo resposta de erro da API
        if (e.error.errors) {
          const mensagens = [];
          for (const campo in e.error.errors) {
            if (e.error.errors.hasOwnProperty(campo)) {
              mensagens.push(...e.error.errors[campo]);
            }
          }
          this.mensagemErro = mensagens.join(' ');
        } else if (e.error.mensagem) {
          this.mensagemErro = e.error.mensagem;
        } else {
          this.mensagemErro = 'Ocorreu um erro ao processar sua solicitação. Tente novamente mais tarde.';
        }
        console.log(e.error);
      }
    })
  }
}
