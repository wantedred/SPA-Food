import { Component, OnInit } from '@angular/core';
import { Nourishment } from '../nourishment';

@Component({
  selector: 'app-nourishment-details',
  templateUrl: './nourishment-details.component.html',
  styleUrls: ['./nourishment-details.component.css']
})
export class NourishmentDetailsComponent implements OnInit {

  constructor(public nourishment: Nourishment) { }

  ngOnInit(): void {
  }

}
