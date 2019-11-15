import { Component, OnInit } from '@angular/core';
import { ApresentacaoService } from 'src/app/services/apresentacao.service';

@Component({
  selector: 'app-rapresentacao',
  templateUrl: './rapresentacao.component.html',
  styleUrls: ['./rapresentacao.component.sass']
})
export class RapresentacaoComponent implements OnInit {

  constructor(private bdService: ApresentacaoService) { }

  ngOnInit() {
  }

}
