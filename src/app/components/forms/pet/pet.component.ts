import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
//import { StepperComponent } from '@progress/kendo-angular-layout';

export interface Item { name: string; species: string; breed: string; gender: string; color: string; size: string; weight: string; age: string }

@Component({
  selector: 'app-pet',
  templateUrl: './pet.component.html',
  styleUrls: ['./pet.component.scss']
})
export class PetComponent implements OnInit {

  @Input() toggle: boolean;
  @Output() toggleChange = new EventEmitter<boolean>();

  public currentStep = 0;

  //@ViewChild('stepper', { static: true })
  //public stepper: StepperComponent;

  private isStepValid = (index: number): boolean => {
    return this.getGroupAt(index).valid || this.currentGroup.untouched;
  };

  private shouldValidate = (index: number): boolean => {
    return this.getGroupAt(index).touched && this.currentStep >= index;
  };

  public steps = [
    {
      label: 'Lost Pet Details 1',
      isValid: this.isStepValid,
      validate: this.shouldValidate
    },
    {
      label: 'Lost Pet Details 2',
      isValid: this.isStepValid,
      validate: this.shouldValidate
    },
    {
      label: 'Lost Pet Details 3',
      isValid: this.isStepValid,
      validate: this.shouldValidate
    }
  ];

  public get currentGroup(): FormGroup {
    return this.getGroupAt(this.currentStep);
  }

  public next(): void {
    //console.log('Submitted data', this.petForm.value.petDetails1.name);
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
    if (this.petForm.valid) {
      //let formObj = this.petForm.getRawValue(); // {name: '', description: ''}
      //console.log(this.petForm.value.petDetails1.value.name.value);
      let petItem = {
        name: this.petForm.value.petDetails1.name,
        species: this.petForm.value.petDetails1.species,
        breed: this.petForm.value.petDetails2.breed,
        gender: this.petForm.value.petDetails2.gender,
        color: this.petForm.value.petDetails3.color,
        size: this.petForm.value.petDetails3.size,
        weight: this.petForm.value.petDetails3.weight,
        age: this.petForm.value.petDetails3.age    
      }
      //console.log(petItem);
      this.addItem(petItem);
      this.toggle = false;
      this.toggleChange.emit(false);
      this.petForm.reset();
      this.currentStep = 0;      
      //console.log('Submitted data', this.petForm.controls);
    }
  }

  // retrieves the group at the specified step index
  private getGroupAt(index: number): FormGroup {
    const groups = Object.keys(this.petForm.controls).map(groupName =>
      this.petForm.get(groupName)
    ) as FormGroup[];

    return groups[index];
  }


  private itemsCollection: AngularFirestoreCollection<Item>;


  petForm = new FormGroup({
    petDetails1: new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
      species: new FormControl('', Validators.required),
      avatar: new FormControl(null)
    }),
    petDetails2: new FormGroup({
      breed: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required)
    }),
    petDetails3: new FormGroup({
      color: new FormControl('', Validators.required),
      size: new FormControl('', Validators.required),
      weight: new FormControl('', [Validators.required, Validators.max(80)]),
      age: new FormControl('', [Validators.required, Validators.max(100)])
    })
  });


  /*
   petForm = this.fb.group({
     name: ['', [Validators.required, Validators.minLength(4)]],
     species: ['', Validators.required],
     breed: ['', Validators.required],
     gender: ['', Validators.required],
     color: ['', Validators.required],
     size: ['', Validators.required],
     weight: ['', [Validators.required, Validators.max(80)]],
     age: ['', [Validators.required, Validators.max(100)]]
   });
 */

  items: Observable<Item[]>;

  constructor(private afs: AngularFirestore) {
    this.itemsCollection = afs.collection<Item>('pets');
    this.items = this.itemsCollection.valueChanges();
  }

  ngOnInit(): void {
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.petForm.value);
    let formObj = this.petForm.getRawValue(); // {name: '', description: ''}

    let serializedForm = JSON.stringify(formObj);
    this.addItem(formObj);
    this.toggle = false;
    this.toggleChange.emit(false);
  }

  addItem(item: Item) {
    this.itemsCollection.add(item);
  }

  close() {
    this.toggle = false;
    this.toggleChange.emit(false);
    this.petForm.reset();
    this.currentStep = 0;
  }

}
