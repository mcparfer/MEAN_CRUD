import { Component, OnInit } from '@angular/core';
import { QueryService } from 'src/app/services/query.service';

@Component({
  selector: 'app-query-two',
  templateUrl: './query-two.component.html',
  styleUrls: ['./query-two.component.css']
})
export class QueryTwoComponent implements OnInit {

  listResults: any = [];

  constructor(private _queryService: QueryService) { }

  ngOnInit(): void {
    this.getResults()
  }

  getResults() {
    this._queryService.getQueryTwo().subscribe({
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
