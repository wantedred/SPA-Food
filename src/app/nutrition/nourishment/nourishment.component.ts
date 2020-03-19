import { Component, OnInit, Input } from '@angular/core';
import { Nourishment } from './nourishment';

@Component({
  selector: 'app-nourishment',
  templateUrl: './nourishment.component.html',
  styleUrls: ['./nourishment.component.css']
})
export class NourishmentComponent implements OnInit {

  @Input() nourishment: Nourishment;

  constructor() { }

  ngOnInit(): void {
  }

}
