import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';

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
  public toggleLogIn = false;  
  public toggleRegister = false;

  //public onToggle(): void {
    //this.show = !this.show;
    //this.toggleText = this.show ? "Hide" : "Show";
  //}

  public kendokaAvatar = 'https://www.telerik.com/kendo-angular-ui-develop/components/navigation/appbar/assets/kendoka-angular.png';

  private itemsCollection: AngularFirestoreCollection<Item>;

  name = new FormControl('ttttt');

  //pet = { name: this.name.value}

  

  items: Observable<Item[]>;

  constructor(private afs: AngularFirestore) {
    this.itemsCollection = afs.collection<Item>('pets');
    this.items = this.itemsCollection.valueChanges();
  }

  ngOnInit() { }

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

  public switchLogIn() {
    this.toggleLogIn = !this.toggleLogIn;
}

  public normalValue = 'Editable TextBox';

}
