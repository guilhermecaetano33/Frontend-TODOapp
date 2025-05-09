import { Component } from '@angular/core';
import { Tarefa } from "./tarefa";
import { HttpClient } from '@angular/common/http';

@Component({
 selector: 'app-root',
 templateUrl: './app.component.html',
 standalone: false,
 styleUrls: ['./app.component.css']
})
export class AppComponent {
 
 title = 'TODOapp';
 
 arrayDeTarefas: Tarefa[] = [];
 apiURL : string
  https: any;
 
 constructor() {
  this.apiURL = "https:backend-todoapp-sq5k.onrender.com";
  this.READ_tarefas();
 }
 CREATE_tarefa(descricaoNovaTarefa: string) {
  var novaTarefa = new Tarefa(descricaoNovaTarefa, false);
 this.https.post<Tarefa>('${this.apiURL}/api/post', novaTarefa).subscribe(resultado => { console.log(resultado); this.READ_tarefas(); });
 }
 
 READ_tarefas() {
  this.https.get<Tarefa[]>('${this.apiURL}/api/getAll').subscribe( resultado: Tarefa[]) => this.arrayDeTarefas=resultado);
 }

 DELETE_tarefa(tarefaAserRemovida: Tarefa) 
 {
 var indice = this.arrayDeTarefas.indexOf(tarefaAserRemovida);
 var id = this.arrayDeTarefas[indice]._id;
 this.https.delete<Tarefa>('${this.apiURL}/api/delete/${id}').subscribe(resultado => { console.log(resultado); this.READ_tarefas(); });

 }


}