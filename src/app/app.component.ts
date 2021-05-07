import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Item { name: string; }

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'petaid';
  public kendokaAvatar = 'https://www.telerik.com/kendo-angular-ui-develop/components/navigation/appbar/assets/kendoka-angular.png';  

  private itemsCollection: AngularFirestoreCollection<Item>;

  items: Observable<Item[]>;

  constructor(private afs: AngularFirestore) {
    this.itemsCollection = afs.collection<Item>('pets');
    this.items = this.itemsCollection.valueChanges();
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
    this.addItem({name:"hedi tayara"});
}

}
