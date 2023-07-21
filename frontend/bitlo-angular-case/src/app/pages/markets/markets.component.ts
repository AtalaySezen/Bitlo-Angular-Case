import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MarketService } from 'src/app/shared/services/market.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
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
  btcToDolarResult: number;
  marketCodeParams: string | null;
  withoutFilterParams: boolean = false;
  withFilterParams: boolean = false;
  previewImage: string = '';
  positiveChanges: MarketData[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;



  constructor(private marketService: MarketService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe(params => {
      this.marketCodeParams = params.get('marketCode');

      this.withoutFilterParams = this.marketCodeParams === null;
      this.withFilterParams = !this.withoutFilterParams;
    });

  }

  ngOnInit() {
    this.getMarketsData();
  }

  getMarketsData() {
    this.loader = true;

    this.marketService.GetProfileInformations().subscribe((data: MarketData[]) => {
      const dataWithIndex = data.map((item: any, index: number) => ({ ...item, index: index + 1 }));
      this.marketDatas = data;
      this.dataSource = new MatTableDataSource(dataWithIndex);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      if (this.marketCodeParams) {
        this.dataSource.filter = this.marketCodeParams;
        const imageParts = this.marketCodeParams.split("-");
        const imageResult = imageParts[0].toLowerCase();
        this.previewImage = `https://static.bitlo.com/cryptologossvg/${imageResult}.svg`
      }

      this.findPositiveChanges(this.marketDatas);
      this.findMostIncreasedMarket(this.marketDatas);
      this.findMostDecreasedMarket(this.marketDatas);
      this.countMarketsAbove10000TRY(this.marketDatas);
      this.countMarketsBelow1TRY(this.marketDatas);
      this.calculateAveragePrice(this.marketDatas);
      this.calculateDolarPrice();
      this.loader = false;

    }, err => {
      console.log(err);
    })

  }

  findPositiveChanges(marketDatas: MarketData[]) {
    this.positiveChanges = marketDatas.filter(marketData => {
      const changePercent = parseFloat(marketData.change24hPercent);
      return !isNaN(changePercent) && changePercent > 0;
    });

    this.positiveChangeResult = `Bugün ${this.positiveChanges.length} adet marketin fiyat değişim yüzdesi pozitif olmuştur.`;

  }


  findMostIncreasedMarket(marketDatas: MarketData[]) {
    let maxChangePercent = -Infinity;
    let mostIncreasedMarketValue: MarketData | null = null;

    for (const marketData of marketDatas) {
      const changePercent = Number(marketData.change24hPercent);
      if (changePercent > maxChangePercent) {
        maxChangePercent = changePercent;
        mostIncreasedMarketValue = marketData;
      }
    }

    this.mostIncreasedMarket = `Bugün en fazla artış gösteren ${mostIncreasedMarketValue?.change24hPercent} market ${mostIncreasedMarketValue?.marketCode} marketi olmuştur.`

  }

  findMostDecreasedMarket(marketDatas: MarketData[]) {
    let mostDecreasedMarketValue = null;
    let minChangePercent = Infinity;

    for (const marketData of marketDatas) {
      const changePercent = Number(marketData.change24hPercent);
      if (changePercent < minChangePercent) {
        minChangePercent = changePercent;
        mostDecreasedMarketValue = marketData;
      }
    }

    this.mostDecreasedMarket = `Bugün en fazla değer kaybeden ${mostDecreasedMarketValue?.change24hPercent} market ${mostDecreasedMarketValue?.marketCode} marketi olmuştur`
  }

  countMarketsAbove10000TRY(marketDatas: MarketData[]) {
    let count = 0;

    const thresholdPrice = 10000;
    for (const marketData of marketDatas) {
      const currentQuote = Number(marketData.currentQuote);
      if (currentQuote > thresholdPrice) {
        count++;
      }
    }

    this.numberOfMarketsAbove10000 = `Fiyatı (currentQuote) 10,000 TRY üzerinde olan toplam ${count} adet market vardır.`
  }


  countMarketsBelow1TRY(marketDatas: MarketData[]) {
    let count = 0;
    const thresholdPrice = 1.00;

    for (const marketData of marketDatas) {
      const currentQuote = Number(marketData.currentQuote);
      if (currentQuote < thresholdPrice) {
        count++;
      }
    }

    this.numberOfMarketsUnder1TRY = `Fiyatı (currentQuote) 1.00 TRY’den daha az olan toplam ${count} adet market vardır)`
  }

  calculateAveragePrice(marketDatas: any[]) {
    const totalPrices = marketDatas.reduce((acc, marketData) => {
      const currentQuote = Number(marketData.currentQuote);
      return acc + currentQuote;
    }, 0);

    const marketCount = this.marketDatas.length;

    if (marketCount === 0) {
      return false;
    } else {
      this.averagePrice = `${totalPrices / marketCount}`;
      return true;
    }
  }


  calculateDolarPrice() {
    const btcTryPrice = this.marketDatas.find(marketData => marketData.marketCode === 'BTC-TRY')?.currentQuote;
    const usdtTryPrice = this.marketDatas.find(marketData => marketData.marketCode === 'USDT-TRY')?.currentQuote;
    const btcTryPriceValue = Number(btcTryPrice || '1');
    const usdtTryPriceValue = Number(usdtTryPrice || '1');

    this.btcToDolarResult = btcTryPriceValue / usdtTryPriceValue;;

  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();

      this.findPositiveChanges(this.dataSource.filteredData);
      this.findMostIncreasedMarket(this.dataSource.filteredData);
      this.findMostDecreasedMarket(this.dataSource.filteredData);
      this.countMarketsAbove10000TRY(this.dataSource.filteredData);
      this.countMarketsBelow1TRY(this.dataSource.filteredData);
      this.calculateAveragePrice(this.dataSource.filteredData);

    }
  }

  goMarketDetail(marketCode: string) {
    this.router.navigate(
      ['/marketler', marketCode],
    );
  }



}
