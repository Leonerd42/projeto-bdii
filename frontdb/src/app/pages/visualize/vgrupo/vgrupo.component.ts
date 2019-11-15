import { Component, OnInit } from '@angular/core';
import { GrupoService } from 'src/app/services/grupo.service';

@Component({
  selector: 'app-vgrupo',
  templateUrl: './vgrupo.component.html',
  styleUrls: ['./vgrupo.component.sass']
})
export class VGrupoComponent implements OnInit {

  constructor(private bdService: GrupoService) { }

  ngOnInit() {
  }

}
