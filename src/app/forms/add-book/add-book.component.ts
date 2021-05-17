import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {Book} from '../../models/book';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {

  @Input() toggle: boolean;
  @Output() toggleChange = new EventEmitter<boolean>();
  items: Observable<Book[]>;
  private itemsCollection: AngularFirestoreCollection<Book>;
//  public myFiles: Array<any>;
  public currentStep = 0;
  
  bookForm = new FormGroup({
    bookDetails: new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(3)]),
      author: new FormControl('', Validators.required),
      synopsis: new FormControl('', Validators.required)
    }),
    bookCover: new FormGroup({
      //files: new FormControl([], [Validators.required]),
      images: new FormControl([], [Validators.required])
    })
  });

  constructor(private afs: AngularFirestore) {
    this.itemsCollection = afs.collection<Book>('books');
    this.items = this.itemsCollection.valueChanges();
  }

  ngOnInit(): void {
  }

  private isStepValid = (index: number): boolean => {
    return this.getGroupAt(index).valid || this.currentGroup.untouched;
  };

  private shouldValidate = (index: number): boolean => {
    return this.getGroupAt(index).touched && this.currentStep >= index;
  };

  public steps = [
    {
      label: 'Book details',
      isValid: this.isStepValid,
      validate: this.shouldValidate
    },
    {
      label: 'Book Cover',
      isValid: this.isStepValid,
      validate: this.shouldValidate
    }
  ];

  public get currentGroup(): FormGroup {
    return this.getGroupAt(this.currentStep);
  }

  public next(): void {
    //console.log('Submitted data', this.petForm.value.petDetails2.images);
    //console.log('Files uploaded', this.petForm.value.petDetails2.files);
    if (this.currentGroup.valid && this.currentStep !== this.steps.length) {
      this.currentStep += 1;
      return;
    }
    this.currentGroup.markAllAsTouched();
  }

  public prev(): void {
    this.currentStep -= 1;
  }

  public submit(): void {
    if (!this.currentGroup.valid) {
      this.currentGroup.markAllAsTouched();
    }
    if (this.bookForm.valid) {
      //let formObj = this.petForm.getRawValue(); // {name: '', description: ''}
      //console.log(this.petForm.value.petDetails1.value.name.value);
      let bookItem = {
        title: this.bookForm.value.bookDetails.title,
        author: this.bookForm.value.bookDetails.author,
        synopsis: this.bookForm.value.bookDetails.synopsis,
        images: this.bookForm.value.bookCover.images,
      }
      //console.log(petItem);
      this.addItem(bookItem);
      this.toggle = false;
      this.toggleChange.emit(false);
      this.bookForm.reset();
      this.currentStep = 0;      
      //console.log('Submitted data', this.petForm.controls);
    }
  }

  // retrieves the group at the specified step index
  private getGroupAt(index: number): FormGroup {
    const groups = Object.keys(this.bookForm.controls).map(groupName =>
      this.bookForm.get(groupName)
    ) as FormGroup[];

    return groups[index];
  }






  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.bookForm.value);
    let formObj = this.bookForm.getRawValue(); // {name: '', description: ''}

    let serializedForm = JSON.stringify(formObj);
    this.addItem(formObj);
    this.toggle = false;
    this.toggleChange.emit(false);
  }

  addItem(item: Book) {
    this.itemsCollection.add(item);
  }

  close() {
    this.toggle = false;
    this.toggleChange.emit(false);
    this.bookForm.reset();
    this.currentStep = 0;
  }
}
