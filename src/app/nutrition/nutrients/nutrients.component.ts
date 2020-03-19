import { Component, OnInit, Input } from '@angular/core';
import { Nutrients } from './nutrients';

@Component({
  selector: 'app-nutrients',
  templateUrl: './nutrients.component.html',
  styleUrls: ['./nutrients.component.css']
})
export class NutrientsComponent implements OnInit {

  @Input() nutrients: Nutrients;


  constructor() { }

  ngOnInit(): void {
  }

}
