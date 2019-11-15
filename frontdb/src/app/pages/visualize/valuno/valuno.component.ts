import { Component, OnInit } from '@angular/core';
import { AlunoService } from 'src/app/services/aluno.service';

@Component({
  selector: 'app-valuno',
  templateUrl: './valuno.component.html',
  styleUrls: ['./valuno.component.sass']
})
export class VAlunoComponent implements OnInit {

  constructor(private bdService: AlunoService) { }

  ngOnInit() {
  }

}
