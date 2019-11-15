import { Component, OnInit } from '@angular/core';
import { AlunoService } from 'src/app/services/aluno.service';

@Component({
  selector: 'app-raluno',
  templateUrl: './raluno.component.html',
  styleUrls: ['./raluno.component.sass']
})
export class RalunoComponent implements OnInit {

  constructor(private bdService: AlunoService) { }

  ngOnInit() {
  }

}
