import { Component, OnInit } from '@angular/core';
import { ApresentacaoService } from 'src/app/services/apresentacao.service';

@Component({
  selector: 'app-vapresentacao',
  templateUrl: './vapresentacao.component.html',
  styleUrls: ['./vapresentacao.component.sass']
})
export class VApresentacaoComponent implements OnInit {

  apresentacoes = [];

  constructor(private bdService: ApresentacaoService) { 
    this.bdService.getPresentation([''],['']).subscribe((res: any) => {
      console.log(res.data); 
        switch(res.status){
          case 'get apresentacao ok': 
            this.apresentacoes = res.data; 
            break;
          default: 
          break;
        }
    })
  }

  ngOnInit() {
  }

}

/**
 * {
      cod_grupo: 1, 
      cod_apresentacao: 1, 
      local: 'kajsdlaslkd', 
      datetime: 'asasa'
  }
 * 
 */