import { Component, OnInit } from '@angular/core';
import { ProfessorService } from 'src/app/services/professor.service';

@Component({
  selector: 'app-vprofessor',
  templateUrl: './vprofessor.component.html',
  styleUrls: ['./vprofessor.component.sass']
})
export class VProfessorComponent implements OnInit {

  constructor(private bdService: ProfessorService) { }

  ngOnInit() {
  }

}
