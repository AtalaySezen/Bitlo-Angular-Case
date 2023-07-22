import { Component, Input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  standalone: true,
  imports: [MatProgressSpinnerModule]
})

export class LoaderComponent {
  @Input() diameter:number = 100;


  ngOnInit(){
    
  }
}
