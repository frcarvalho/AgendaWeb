import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../../environments/environment';
@Component({
  selector: 'app-criar-usuario',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './criar-usuario.component.html',
  styleUrl: './criar-usuario.component.css'
})
export class CriarUsuarioComponent {

    //atributos
    mensagemSucesso: string = '';
    mensagemErro: string = '';

  //construtor para injeção de dependencia
  constructor(
    private httpClient: HttpClient
  ){

  }
  form = new FormGroup({
    nome : new FormControl(''),
    email : new FormControl(''),
    senha : new FormControl('')
  })

  //função para capturar o submit do formulario
  onSubmit(){
    
    this.mensagemSucesso = '';
    this.mensagemErro = '';

    //fazendo uma requisição para o serviço de criação de usuários da API
    this.httpClient.post(environment.apiUsuario + "api/usuarios/criar", this.form.value)
    .subscribe({//capturando resposta
      next: (data: any) => {
        this.mensagemSucesso = `Parabéns ${data.nome}, sua conta foi criado com sucesso.`;
        //console.log(data)
        this.form.reset(); //limpar formulario
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
    });
  }
}
