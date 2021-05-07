import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Item { name: string; }

@Component({
  selector: 'app-app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.scss']
})
export class AppBarComponent implements OnInit {

  public kendokaAvatar = 'https://www.telerik.com/kendo-angular-ui-develop/components/navigation/appbar/assets/kendoka-angular.png';  

  private itemsCollection: AngularFirestoreCollection<Item>;

  items: Observable<Item[]>;

  constructor(private afs: AngularFirestore) {
    this.itemsCollection = afs.collection<Item>('pets');
    this.items = this.itemsCollection.valueChanges();
  }

  ngOnInit(){}

  addItem(item: Item) {
    this.itemsCollection.add(item);
  }

  item$: Observable<any[]>;

  //constructor(firestore: AngularFirestore) {
  //  this.item$ = firestore.collection('pets').valueChanges();
  //} 

  public onButtonClick(): void {
    console.log('click');
    this.addItem({name:"hedi tayara"});
}
}
