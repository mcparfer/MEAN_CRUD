import { Component, OnInit } from '@angular/core';
import { QueryService } from 'src/app/services/query.service';

@Component({
  selector: 'app-query-four',
  templateUrl: './query-four.component.html',
  styleUrls: ['./query-four.component.css']
})
export class QueryFourComponent implements OnInit {

  listResults: any = [];

  constructor(private _queryService: QueryService) { }

  ngOnInit(): void {
    this.getResults()
  }

  getResults() {
    this._queryService.getQueryFour().subscribe({
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
