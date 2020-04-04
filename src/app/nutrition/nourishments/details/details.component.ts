import { Component, OnInit, Inject } from '@angular/core';
import { Nourishment } from '../nourishment';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  @Inject nourishment: Nourishment;

  constructor(public nourishment: Nourishment) { }

  ngOnInit(): void {

  }

}
