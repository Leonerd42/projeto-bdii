import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-select-unity',
  templateUrl: './select-unity.component.html',
  styleUrls: ['./select-unity.component.sass']
})
export class SelectUnityComponent implements OnInit {

  @Input() listaUnidade; 

  constructor() { }

  ngOnInit() {
  }

}
