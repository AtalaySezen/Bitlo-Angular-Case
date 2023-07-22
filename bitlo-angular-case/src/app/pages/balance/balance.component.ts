import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { balanceModel } from 'src/app/shared/models/balance.model';
import { BalanceService } from 'src/app/shared/services/balance.service';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent {
  loader: boolean = false;
  balanceData = new MatTableDataSource<balanceModel>();
  displayedColumns: string[] = ['assetCode', 'availableAmount', 'availableAmountTRYValue'];
  hideLowBalances: boolean = true;
  filteredBalanceData = new MatTableDataSource<balanceModel>();

  constructor(private balanceService: BalanceService) {
  }

  ngOnInit() {
    this.getBalanceData();
  }

  getBalanceData() {
    this.loader = true;
    this.balanceService.GetBalanceInformation().subscribe({
      next: (data: any) => {
        this.balanceData.data = data.balances;
        this.loader = false;
      }
    });
  }


  updateFilteredBalanceData() {
    if (this.hideLowBalances) {
      this.filteredBalanceData.data = this.balanceData.data.filter((element: any) => {
        return element.availableAmount >= 1 && element.availableAmountTRYValue >= 1;
      });
    } else {
      this.filteredBalanceData.data = this.balanceData.data.filter((element: any) => {
        return true;
      });
    }
  }


  shouldShowValue(element: any, column: string) {
    if (column === 'availableAmount') {
      return !(this.hideLowBalances && element[column] < 1);
    } else if (column === 'availableAmountTRYValue') {
      return !(this.hideLowBalances && element[column] < 1);
    }

    return true;
  }




}
