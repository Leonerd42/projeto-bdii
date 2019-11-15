import { Component, OnInit } from '@angular/core';
import { ProfessorService } from 'src/app/services/professor.service';

@Component({
  selector: 'app-rprofessor',
  templateUrl: './rprofessor.component.html',
  styleUrls: ['./rprofessor.component.sass']
})
export class RProfessorComponent implements OnInit {

  constructor(private bdService: ProfessorService) { }

  ngOnInit() {
  }

}
