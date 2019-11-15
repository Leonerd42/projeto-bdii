import { Component, OnInit } from '@angular/core';
import { SalaService } from 'src/app/services/sala.service';

@Component({
  selector: 'app-vsala',
  templateUrl: './vsala.component.html',
  styleUrls: ['./vsala.component.sass']
})
export class VSalaComponent implements OnInit {

  constructor(private bdService: SalaService) { }

  ngOnInit() {
  }

}
