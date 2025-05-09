import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Tarefa } from "../tarefa";

@Component({
 selector: 'app-root',
 templateUrl: './app.component.html',
 styleUrls: ['./app.component.css']
})
export class AppComponent {
  emEdicao = false;
 @Input() tarefa: Tarefa = new Tarefa("", false);
 @Output() removeTarefa = new EventEmitter();
 title = 'TODOapp';
 arrayDeTarefas: Tarefa[] = [];
 apiURL : string
 
 constructor() {
  this.apiURL = "https:backend-todoapp-sq5k.onrender.com";
  this.READ_tarefas();
 }
 CREATE_tarefa(descricaoNovaTarefa: string) {
  var novaTarefa = new Tarefa(descricaoNovaTarefa, false);
 this.https.post<Tarefa>('${this.apiURL}/api/post', novaTarefa).subscribe(resultado => { console.log(resultado); this.READ_tarefas(); });
 }
 
 READ_tarefas() {
 this.arrayDeTarefas = [
 new Tarefa("Estudar Frameworks WEB", false),
 new Tarefa("Comer Pizza", false),
 new Tarefa("Ajudar meus pais", false)
 ];
 }
}

DELETE_tarefa(tarefaAserRemovida : Tarefa) {
 this.arrayDeTarefas.splice(this.arrayDeTarefas.indexOf(tarefaAserRemovida), 1);
}


