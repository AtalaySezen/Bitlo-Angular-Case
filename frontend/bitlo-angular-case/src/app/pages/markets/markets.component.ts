import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MarketService } from 'src/app/shared/services/market.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-markets',
  templateUrl: './markets.component.html',
  styleUrls: ['./markets.component.scss']
})

export class MarketsComponent {
  loader: boolean = false;
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['index', 'marketCode', 'notionalVolume24h', 'volume24h', 'weightedAverage24h', 'lowestQuote24h', 'highestQuote24h', 'currentQuote', 'change24hPercent', 'change24h', 'bid', 'ask'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private marketService: MarketService) {
    this.getMarketsData();
  }



  getMarketsData() {

    this.marketService.GetProfileInformations().subscribe((data: any) => {
      console.log(data);
      const dataWithIndex = data.map((item: any, index: number) => ({ ...item, index: index + 1 }));
      this.dataSource = new MatTableDataSource(dataWithIndex);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  goMarketDetail(id: any) {
    console.log(id);
  }


}
