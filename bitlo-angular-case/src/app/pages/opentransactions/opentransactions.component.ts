import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiResponse } from 'src/app/shared/models/openOrders.model';
import { OpenordersService } from 'src/app/shared/services/openorders.service';

@Component({
  selector: 'app-opentransactions',
  templateUrl: './opentransactions.component.html',
  styleUrls: ['./opentransactions.component.scss']
})
export class OpentransactionsComponent {
  loader: boolean = false;
  openOrdersData = new MatTableDataSource<ApiResponse>();
  displayedColumns: string[] = ['marketCode', 'orderSide', 'orderDate', 'price', 'orderAmount', 'fillAmount', 'fillPercent'];


  constructor(private openOrdersService: OpenordersService) { }

  ngOnInit() {
    this.getOpenOrdersData();
  }

  getOpenOrdersData() {
    this.loader = true;
    this.openOrdersService.GetOpenOrders().subscribe({
      next: (data: ApiResponse) => {
        if (data.message === 'Auth success') {
          this.openOrdersData = new MatTableDataSource(data.openOrders);
        }
        this.loader = false;
      },
      error: () => {
        this.loader = false;
      }
    });
  }







}
