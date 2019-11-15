import { Component, OnInit } from '@angular/core';
import { UnidadeService } from 'src/app/services/unidade.service';

@Component({
  selector: 'app-vunidade',
  templateUrl: './vunidade.component.html',
  styleUrls: ['./vunidade.component.sass']
})
export class VUnidadeComponent implements OnInit {

  constructor(private bdService: UnidadeService) { }

  ngOnInit() {
  }

}
