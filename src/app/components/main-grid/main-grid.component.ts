import { Component, OnInit } from '@angular/core';
import { GridDataResult, DataStateChangeEvent } from "@progress/kendo-angular-grid";
import { products } from "../../products";
import { State } from '@progress/kendo-data-query';
import { CategoriesService } from '../../northwind.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-main-grid',
  templateUrl: './main-grid.component.html',
  styleUrls: ['./main-grid.component.scss']
})
export class MainGridComponent implements OnInit {

  public columns: any[] = [{field: "CategoryID"}, {field: "CategoryName"}, {field: "Description"}];
  /*
  public columns: any[] = [
    { field: "ProductID" },
    { field: "ProductName" },
    { field: "QuantityPerUnit" },
  ];
  */
  
  public bindingType: String = 'gridData';
  public gridData: any = products;
  public gridDataResult: GridDataResult = {data: products, total: products.length};

  public view: Observable<GridDataResult>;

  constructor(private service: CategoriesService) { this.view = service; }

  ngOnInit(): void {
    const state: State = {skip: 0, take: 100};
    this.service.query(state);
    this.view.subscribe(res => {
      this.gridData = res;
      });
  }

}
