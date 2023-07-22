import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { MarketData } from 'src/app/shared/models/markets.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  withoutFilterParams: boolean = false;
  withFilterParams: boolean = false;
  @Input() listArray: any[] = [];
  @Input() marketCodeParams: string | null;
  @Input() previewImage: string | null;
  @Input() dataSource = new MatTableDataSource<MarketData>();

  constructor(private activatedRoute: ActivatedRoute) {
    this.GetUserMarketParams();
  }

  GetUserMarketParams() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.marketCodeParams = params.get('marketCode');
      this.withoutFilterParams = this.marketCodeParams === null;
      this.withFilterParams = !this.withoutFilterParams;
    });
  }


}
