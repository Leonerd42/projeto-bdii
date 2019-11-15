import { Component, OnInit } from '@angular/core';
import { SalaService } from 'src/app/services/sala.service';

@Component({
  selector: 'app-rsala',
  templateUrl: './rsala.component.html',
  styleUrls: ['./rsala.component.sass']
})
export class RsalaComponent implements OnInit {

  constructor(private bdService: SalaService) { }

  ngOnInit() {
  }

}
