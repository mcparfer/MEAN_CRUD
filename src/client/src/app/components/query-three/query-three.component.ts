import { Component, OnInit } from '@angular/core';
import { QueryService } from 'src/app/services/query.service';

@Component({
  selector: 'app-query-three',
  templateUrl: './query-three.component.html',
  styleUrls: ['./query-three.component.css']
})
export class QueryThreeComponent implements OnInit {

  listResults: any = [];

  constructor(private _queryService: QueryService) { }

  ngOnInit(): void {
    this.getResults()
  }

  getResults() {
    this._queryService.getQueryThree().subscribe({
      next: data => {
        console.log(data);
        this.listResults = data;
      },
      error: error => {
        console.log(error);
      }
    })
  }

}
