import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { books } from './books';

//export interface Item { age: number; breed: string; name: string }
export interface Item { title: string; author: string }

@Injectable({
  providedIn: 'root'
})
export class FireCRUDService {

    private itemsCollection: AngularFirestoreCollection<Item>;
    items: Observable<Item[]>;

  constructor(public db: AngularFireDatabase, private afs: AngularFirestore) {

  }

        public get(): Observable<any>{
            //return this.db.list('products').valueChanges();
            this.itemsCollection = this.afs.collection<Item>('books');
            this.items = this.itemsCollection.valueChanges();

            return this.items;
        }

        public save(data: any, isNew?: boolean) {
            if(isNew){
                this.itemsCollection.add(data);
                //let newPostKey = this.db.database.ref().child('pets').push().key;
                //data.key = newPostKey;
                //this.db.database.ref('pets/' + newPostKey).set(data);
            }else{
                //this.db.database.ref('pets/' + data.key).set(data);
                console.log(data.key);
            }        
        }

        public remove(data: any) {
            this.db.database.ref('books/' + data.key).remove();
        }

        public resetData(){
            this.db.database.ref('/').set(books);
        }
}
