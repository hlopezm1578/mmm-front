import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  assets:any[]=[];
  totalProfit: number = 0;
  totalOperations:number = 0;
  winPos : number = 0;
  losePos:number = 0;

  constructor(private service:BackendService) { }

  ngOnInit(): void {
    this.service.getAssets().subscribe((resp:any)=>{
      if(resp.ok){
        var processAssets = this.processData(resp.assets);
        this.assets = processAssets;
        this.totalProfit = this.getTotalProfit(processAssets);
        console.log(resp);
      }
     
    })
  }

  processData(assets:any){
    assets.forEach((asset:any) => {
      var wins = asset.positions.filter((position:any)=>{
        if(position.result>0){
          return true;
        }else{
          return false;
        }
      }).length;
      var loses = asset.positions.filter((position:any)=>{
        if(position.result<0){
          return true;
        }else{
          return false;
        }
      }).length;
      asset.total = wins+loses;
      asset.loses = loses;
      asset.wins = wins;
      asset.pnWins = wins*asset.risk;
      asset.pnLoses = loses*2;
      asset.pnTotal = asset.pnWins - asset.pnLoses;
      asset.profit = asset.pnTotal/100;
      var wr = asset.total>0 ? asset.wins/asset.total : 0;
      asset.wr = wr;
    });
    return assets;
  }

  getTotalProfit(assets:any){
    var sum=0;
    var wins = 0;
    var loses = 0;
    assets.forEach((asset:any) => {
      sum += parseFloat(asset.profit);
      wins += asset.wins;
      loses += asset.loses;
    })

    this.winPos = wins;
    this.losePos = loses;
    this.totalOperations = wins+loses;

    return sum;
  }


}
