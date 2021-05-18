import { Component, OnInit } from '@angular/core';
import { FireCRUDService } from '../fire-crud.service';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public formGroup: FormGroup;
  private editedRowIndex: number;
  public view: Observable<any>;

   //public columns: any[] = [{ field: "CategoryID" }, { field: "CategoryName" }, { field: "Description" }];
  /*
  public columns: any[] = [
    { field: "ProductID" },
    { field: "ProductName" },
    { field: "QuantityPerUnit" },
  ];
  */

  //public bindingType: String = 'gridData';
  //public gridData: any = products;
  //public gridDataResult: GridDataResult = { data: products, total: products.length };

  //public view: Observable<GridDataResult>;

  constructor(public editService: FireCRUDService) { this.view = this.editService.get(); }

  ngOnInit(): void {
    /*
    const state: State = { skip: 0, take: 100 };
    this.service.query(state);
    this.view.subscribe(res => {
      this.gridData = res;
    });
    */
  }

  public addHandler({ sender }) {
    //console.log("add data");
    this.closeEditor(sender);
/*
    this.formGroup = new FormGroup({
      'ProductID': new FormControl(),
      'ProductName': new FormControl('', Validators.required),
      'UnitPrice': new FormControl(0),
      'UnitsInStock': new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[0-9]{1,3}')])),
      'Discontinued': new FormControl(false)
    });
*/
this.formGroup = new FormGroup({
  'title': new FormControl(),
  'author': new FormControl('', Validators.required)
});
    sender.addRow(this.formGroup);
  }

  public editHandler({ sender, rowIndex, dataItem }) {
    this.closeEditor(sender);

    this.formGroup = new FormGroup({
      'title': new FormControl(dataItem.age, Validators.required),
      'author': new FormControl(dataItem.breed, Validators.required)
    });

    this.editedRowIndex = rowIndex;

    sender.editRow(rowIndex, this.formGroup);
  }

  public cancelHandler({ sender, rowIndex }) {
    this.closeEditor(sender, rowIndex);
  }

  public saveHandler({ sender, rowIndex, formGroup, isNew, dataItem }) {
    console.log("save data");
    console.log('sender: ' + sender.value);
    console.log('rowIndex: ' + rowIndex);
    console.log('formGroup: ' + formGroup.value);
    console.log('isNew: ' + isNew);
    console.log('dataItem: ' + dataItem.value);    
    const book = formGroup.value;
    book.key = dataItem.key;

    this.editService.save(book, isNew);

    sender.closeRow(rowIndex);
  }

  public removeHandler({ dataItem }) {
    this.editService.remove(dataItem);
  }

  private closeEditor(grid, rowIndex = this.editedRowIndex) {
    grid.closeRow(rowIndex);
    this.editedRowIndex = undefined;
    this.formGroup = undefined;
  }

  public resetData() {
    this.editService.resetData();
  }
}
