import { Component, OnInit } from '@angular/core';
import { GrupoService } from 'src/app/services/grupo.service';

@Component({
  selector: 'app-rgrupo',
  templateUrl: './rgrupo.component.html',
  styleUrls: ['./rgrupo.component.sass']
})
export class RgrupoComponent implements OnInit {

  constructor(private bdService: GrupoService) { }

  ngOnInit() {
  }

}
