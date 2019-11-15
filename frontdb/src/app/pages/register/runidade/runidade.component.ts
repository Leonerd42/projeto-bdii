import { Component, OnInit } from '@angular/core';
import { UnidadeService } from 'src/app/services/unidade.service';

@Component({
  selector: 'app-runidade',
  templateUrl: './runidade.component.html',
  styleUrls: ['./runidade.component.sass']
})
export class RUnidadeComponent implements OnInit {

  constructor(private bdService: UnidadeService) { }

  ngOnInit() {
  }

}
