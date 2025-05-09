import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tarefa } from './tarefas';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false // manter como false se estiver usando AppModule
})
export class AppComponent {
  title = 'TODOapp';
  arrayDeTarefas: Tarefa[] = [];
  apiURL: string;
  https: any;

  constructor(private http: HttpClient) {
    this.apiURL = "https://backend-todoapp-sq5k.onrender.com";
    this.https = http;
    this.READ_tarefas();
  }

  CREATE_tarefa(descricaoNovaTarefa: string) {
    const novaTarefa = new Tarefa(descricaoNovaTarefa, false);
    this.https.post<Tarefa>(`${this.apiURL}/api/post`, novaTarefa)
      .subscribe(resultado => {
        console.log('Tarefa criada:', resultado);
        this.READ_tarefas();
      });
  }

  READ_tarefas() {
    this.https.get<Tarefa[]>(`${this.apiURL}/api/getALL`)
      .subscribe(resultado => {
        this.arrayDeTarefas = resultado;
      });
  }

  DELETE_tarefa(tarefaASerRemovida: Tarefa) {
    const indice = this.arrayDeTarefas.indexOf(tarefaASerRemovida);
    if (indice !== -1 && this.arrayDeTarefas[indice]) {
      const id = this.arrayDeTarefas[indice]._id;
      this.https.delete<Tarefa>(`${this.apiURL}/api/delete/${id}`)
        .subscribe(resultado => {
          console.log('Tarefa removida:', resultado);
          this.READ_tarefas();
        });
    }
  }
}
