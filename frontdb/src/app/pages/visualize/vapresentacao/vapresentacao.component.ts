import { Component, OnInit } from '@angular/core';
import { ApresentacaoService } from 'src/app/services/apresentacao.service';

@Component({
  selector: 'app-vapresentacao',
  templateUrl: './vapresentacao.component.html',
  styleUrls: ['./vapresentacao.component.sass']
})
export class VApresentacaoComponent implements OnInit {

  constructor(private bdService: ApresentacaoService) { }

  ngOnInit() {
  }

}
