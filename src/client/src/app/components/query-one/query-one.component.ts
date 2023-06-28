import { Component, OnInit } from '@angular/core';
import { QueryService } from 'src/app/services/query.service';

@Component({
  selector: 'app-query-one',
  templateUrl: './query-one.component.html',
  styleUrls: ['./query-one.component.css']
})

export class QueryOneComponent implements OnInit {

  listResults: any = [];

  constructor(private _queryService: QueryService) { }

  ngOnInit(): void {
    this.getResults()
  }

  getResults() {
    this._queryService.getQueryOne().subscribe({
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
