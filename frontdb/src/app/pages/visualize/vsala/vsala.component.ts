import { Component, OnInit } from '@angular/core';
import { SalaService } from 'src/app/services/sala.service';
import { UnidadeService } from 'src/app/services/unidade.service';

@Component({
  selector: 'app-vsala',
  templateUrl: './vsala.component.html',
  styleUrls: ['./vsala.component.sass']
})
export class VSalaComponent implements OnInit {

  unity = '';

  unidades; 
  salas = [];

  constructor(private bdService: SalaService, 
              private unityService: UnidadeService) { 
    this.unityService.selectUnity([''],['']).subscribe((res: any) => {
      console.log(res.data); 
        switch(res.status){
          case 'get unidade ok': 
            this.unidades = res.data; 
            break;
          default: 
          break;
        }
    });
  }

  ngOnInit() {
  }

  updateRooms(){
    this.bdService.getRoom([''],[this.unity]).subscribe((res: any) => {
      console.log(res.data); 
      switch(res.status){
        case 'get salas ok': 
          this.salas = res.data; 
          break;
        default: 
        break;
      }
    });
  }

}
