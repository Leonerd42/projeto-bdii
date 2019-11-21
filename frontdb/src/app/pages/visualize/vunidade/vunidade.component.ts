import { Component, OnInit } from '@angular/core';
import { UnidadeService } from 'src/app/services/unidade.service';

@Component({
  selector: 'app-vunidade',
  templateUrl: './vunidade.component.html',
  styleUrls: ['./vunidade.component.sass']
})
export class VUnidadeComponent implements OnInit {

  alertError = false; 

  unidades = []; 
  arrayShowUnity = [];
  constructor(private bdService: UnidadeService) { }

  ngOnInit() {
    this.bdService.selectUnity(['']).subscribe((res: any) => {
      switch(res.status){
        case 'get unidade ok':
          this.unidades = res.data; 
          for(let i=0; i<res.data.length; i++){
            this.arrayShowUnity[i] = false;
          }
          break;
        default:
          this.alertError = true; 
          break; 
      }
      
    })
  }

  showUnityData(i) {
    var aux = this.arrayShowUnity.map((item, index) => {
        if(i == index){
          if( item == true)
            return false;
          else return true; 
        } else {
          return false;
        }
    }); 
    this.arrayShowUnity = aux;
  }

}
