import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Nourishment } from 'src/app/nutrition/nourishments/nourishment';
import { NourishmentService } from 'src/app/nutrition/nourishments/nourishment.service';

@Component({
  selector: 'app-nourishments-overview',
  templateUrl: './nourishments-overview.component.html',
  styleUrls: ['./nourishments-overview.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class NourishmentsOverviewComponent implements OnInit, AfterViewInit {

  nourishments: Nourishment[] = [];

  columnNames: string[] = ['id', 'brand', 'name', 'type'];
  expandedElement: Nourishment | null;

  resultsLength: number = 0;
  isLoadingResults: boolean = true;
  isHasNoResults: boolean = false;
  message: string = null;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  data: MatTableDataSource<Nourishment> = null;

  public constructor(
    private nourishmentService: NourishmentService,
    private location: Location) { }

  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.data.filter = filterValue.trim().toLowerCase();

    if (this.data.paginator) {
      this.data.paginator.firstPage();
    }
  }

  ngAfterViewInit() {
    this.nourishmentService.fetchNourishments().subscribe(nourishments => {
      this.nourishments = nourishments;
      this.isLoadingResults = false;
      this.isHasNoResults = this.nourishments.length == 0;
      this.resultsLength = this.nourishments.length;
      // If the user changes the sort order, reset back to the first page.
      this.data = new MatTableDataSource(this.nourishments);
      this.data.paginator = this.paginator;
      this.data.sort = this.sort;
    });
  }

  delete(nourishment: Nourishment): void {
    this.nourishments = this.nourishments.filter(u => u !== nourishment);
    this.nourishmentService.deleteNourishment(nourishment)
      .subscribe(resp => {
        if (!resp.success) {
          this.message = resp.message;
          return;
        }
        this.message = null;
      }
    );
  }

  goBack(): void {
    this.location.back();
  }

}
