import { Component, OnInit } from '@angular/core';
import { retry } from 'rxjs';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  assets:any[]=[];

  constructor(private service:BackendService) { }

  ngOnInit(): void {
    this.service.getAssets().subscribe((resp:any)=>{
      if(resp.ok){
        this.assets = resp.assets
        this.assets.forEach(asset => {
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
          var wr = asset.total>0 ? asset.wins/asset.total : 0;
          asset.wr = wr;
        });
        console.log(resp);
      }
     
    })
  }

}
