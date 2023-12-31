import { Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { balanceModel } from 'src/app/shared/models/balance.model';
import { BalanceService } from 'src/app/shared/services/balance.service';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent {
  balanceData = new MatTableDataSource<balanceModel>();
  withoutFilterBalanceData: balanceModel[] = [];
  displayedColumns: string[] = ['assetCode', 'availableAmount', 'availableAmountTRYValue'];
  showHideLowBalance: string = 'Düşük Bakiyeleri Göster';
  showHideBalanceIcon: string = 'visibility_off';
  loader: boolean = false;
  hideLowBalances: boolean = true;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(private balanceService: BalanceService) {}


  ngOnInit() {
    this.getBalanceData();
  }

  getBalanceData() {
    this.loader = true;
    this.balanceService.GetBalanceInformation().subscribe({
      next: (data: any) => {
        this.balanceData.data = data.balances;
        this.withoutFilterBalanceData = data.balances;
        this.balanceData.sort = this.sort;
        this.updateFilteredBalanceData();
        this.loader = false;
      },
      error: () => {
        this.loader = false;
      }
    });
  }

  updateFilteredBalanceData() {
    this.balanceData.data = this.hideLowBalances
      ? this.balanceData.data.filter(item => item.availableAmount !== undefined && item.availableAmount >= 1)
      : this.withoutFilterBalanceData;

    this.showHideLowBalance = this.hideLowBalances ? 'Düşük Bakiyeleri Gizle' : 'Düşük Bakiyeleri Göster';
    this.showHideBalanceIcon = this.hideLowBalances ? 'visibility_off' : 'visibility';
  }



}
