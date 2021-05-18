import { Component, OnInit,  ElementRef, HostListener, ViewChild, ViewEncapsulation, } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { Router } from "@angular/router";


export interface Item { name: string; }

@Component({
  selector: 'app-app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.scss']
})
export class AppBarComponent implements OnInit {



  //private toggleText = "Show";
  //show = false;
  public toggle = false;
  public toggleRegister = false;

  public menuItems: any[];
  //public onToggle(): void {
    //this.show = !this.show;
    //this.toggleText = this.show ? "Hide" : "Show";
  //}

  //public kendokaAvatar = 'https://www.telerik.com/kendo-angular-ui-develop/components/navigation/appbar/assets/kendoka-angular.png';

  private itemsCollection: AngularFirestoreCollection<Item>;

  name = new FormControl('ttttt');

  //pet = { name: this.name.value}

  

  items: Observable<Item[]>;

  constructor(private router: Router, private afs: AngularFirestore) {
    this.itemsCollection = afs.collection<Item>('pets');
    this.items = this.itemsCollection.valueChanges();
    this.menuItems = this.mapItems(router.config);
  }

  ngOnInit() { }



  public onSelect({ item }): void {
    if (!item.items) {
      this.router.navigate([item.path]);
    }
  }
  
  // convert the routes to menu items.
  private mapItems(routes: any[], path?: string): any[] {
    return routes.map((item) => {
      const result: any = {
        text: item.text,
        path: (path ? `${path}/` : "") + item.path,
      };

      if (item.children) {
        result.items = this.mapItems(item.children, item.path);
      }

      return result;
    });
  }

  addItem(item: Item) {
    this.itemsCollection.add(item);
  }

  item$: Observable<any[]>;

  //constructor(firestore: AngularFirestore) {
  //  this.item$ = firestore.collection('pets').valueChanges();
  //} 

  public onButtonClick(): void {
    console.log('click');
    this.addItem({ name: this.name.value});
  }

  

  //public close(flag) {
      //console.log(`Dialog result: ${status}`);
      //if(status === 'yes'){
        //this.addItem({ name: this.name.value});
        //console.log(`Dialog result: ${this.normalValue}`)
      //}
      //this.toggle = flag;
  //}

  public open() {
      this.toggle = true;
  }

  public openRegister() {
    this.toggleRegister  = true;
}



  public normalValue = 'Editable TextBox';

}
