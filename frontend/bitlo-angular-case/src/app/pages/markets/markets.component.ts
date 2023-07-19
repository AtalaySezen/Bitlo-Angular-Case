import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MarketService } from 'src/app/shared/services/market.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MarketData } from 'src/app/shared/models/markets.model';

@Component({
  selector: 'app-markets',
  templateUrl: './markets.component.html',
  styleUrls: ['./markets.component.scss']
})

export class MarketsComponent {
  loader: boolean = false;
  input: string;
  dataSource = new MatTableDataSource<MarketData>();
  marketDatas: MarketData[];
  displayedColumns: string[] = ['index', 'marketCode', 'notionalVolume24h', 'volume24h', 'weightedAverage24h', 'lowestQuote24h', 'highestQuote24h', 'currentQuote', 'change24hPercent', 'change24h', 'bid', 'ask'];
  positiveChangeResult: string;
  mostIncreasedMarket: string;
  mostDecreasedMarket: string;
  numberOfMarketsAbove10000: string;
  numberOfMarketsUnder1TRY: string;
  averagePrice: string;
  btcToDolarResult: string;


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private marketService: MarketService, private router: Router) {
    this.getMarketsData();
  }



  getMarketsData() {
    this.loader = true;
    this.marketService.GetProfileInformations().subscribe(async (data: MarketData[]) => {
      console.log(data);
      const dataWithIndex = data.map((item: any, index: number) => ({ ...item, index: index + 1 }));
      this.marketDatas = await data;
      console.log(this.marketDatas);
      this.dataSource = new MatTableDataSource(await dataWithIndex);
      this.dataSource.paginator = await this.paginator;
      this.dataSource.sort = await this.sort;
      this.findPositiveChanges();
      this.findMostIncreasedMarket();
      this.findMostDecreasedMarket();
      this.countMarketsAbove10000TRY();
      this.countMarketsBelow1TRY();
      this.calculateAveragePrice();
      this.calculateDolarPrice();
      this.loader = await false;

    }, err => {
      console.log(err);
    })
  }

  findPositiveChanges() {
    const positiveChanges = [];
    for (const marketData of this.marketDatas) {
      const changePercent = parseFloat(marketData.change24hPercent);
      if (changePercent > 0) {
        positiveChanges.push(marketData);
      }
    }
    const N = positiveChanges.length;
    this.positiveChangeResult = `Bugün ${N} adet marketin fiyat değişim yüzdesi pozitif olmuştur.`;
  }


  findMostIncreasedMarket() {
    let maxChangePercent = -Infinity;
    let mostIncreasedMarketValue = null;
    for (const marketData of this.marketDatas) {
      const changePercent = parseFloat(marketData.change24hPercent);
      if (changePercent > maxChangePercent) {
        maxChangePercent = changePercent;
        mostIncreasedMarketValue = marketData;
      }
    }
    this.mostIncreasedMarket = `Bugün en fazla artış gösteren ${mostIncreasedMarketValue?.change24hPercent} market ${mostIncreasedMarketValue?.marketCode} marketi olmuştur.`
  }

  findMostDecreasedMarket() {
    let mostDecreasedMarketValue = null;
    let minChangePercent = Infinity;

    for (const marketData of this.marketDatas) {
      const changePercent = parseFloat(marketData.change24hPercent);
      if (changePercent < minChangePercent) {
        minChangePercent = changePercent;
        mostDecreasedMarketValue = marketData;
      }
    }
    this.mostDecreasedMarket = `Bugün en fazla değer kaybeden ${mostDecreasedMarketValue?.change24hPercent} market ${mostDecreasedMarketValue?.marketCode} marketi olmuştur`
  }

  countMarketsAbove10000TRY() {
    let count = 0;
    const thresholdPrice = 10000;
    for (const marketData of this.marketDatas) {
      const currentQuote = parseFloat(marketData.currentQuote);
      if (currentQuote > thresholdPrice) {
        count++;
      }
    }
    this.numberOfMarketsAbove10000 = `Fiyatı (currentQuote) 10,000 TRY üzerinde olan toplam ${count} adet market vardır.`

  }


  countMarketsBelow1TRY() {
    let count = 0;
    const thresholdPrice = 1.00;

    for (const marketData of this.marketDatas) {
      const currentQuote = parseFloat(marketData.currentQuote);
      if (currentQuote < thresholdPrice) {
        count++;
      }
    }
    this.numberOfMarketsUnder1TRY = `Fiyatı (currentQuote) 1.00 TRY’den daha az olan toplam ${count} adet market vardır)`

  }

  calculateAveragePrice() {
    const totalPrices = this.marketDatas.reduce((acc, marketData) => {
      const currentQuote = parseFloat(marketData.currentQuote);
      return acc + currentQuote;
    }, 0);
    const marketCount = this.marketDatas.length;
    if (marketCount === 0) {
      return 0;
    } else {
      this.averagePrice = `Tüm marketlerdeki fiyatların toplamının (currentQuote) aritmetik ortalaması ${totalPrices / marketCount} TRY dir.`
    }
    //Burayı kaldıralım sonrasında
    return totalPrices / marketCount;
  }


  calculateDolarPrice() {
    const btcTryPrice = this.marketDatas.find(marketData => marketData.marketCode === 'BTC-TRY')?.currentQuote;
    const usdtTryPrice = this.marketDatas.find(marketData => marketData.marketCode === 'USDT-TRY')?.currentQuote;
    const btcTryPriceValue = parseFloat(btcTryPrice || '1');
    const usdtTryPriceValue = parseFloat(usdtTryPrice || '1');

    const btcToDolar = btcTryPriceValue / usdtTryPriceValue;
    this.btcToDolarResult = `1 BTC = ${btcToDolar} ABD dolarıdır`

  }





  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  goMarketDetail(marketCode: string) {
    console.log(marketCode);
    this.router.navigate(['marketler/', marketCode])

  }


}
