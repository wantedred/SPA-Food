import { Component, OnInit } from '@angular/core';
import { Nourishment } from 'src/app/nutrition/nourishments/nourishment';
import { InventoryService } from './inventory.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  nourishments: Nourishment[] = [];


  constructor(invService: InventoryService) { }

  ngOnInit(): void {

  }



}
