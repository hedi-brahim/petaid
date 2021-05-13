import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FileRestrictions, SelectEvent, RemoveEvent } from '@progress/kendo-angular-upload';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-pet-details2',
  templateUrl: './pet-details2.component.html',
  styleUrls: ['./pet-details2.component.scss']
})
export class PetDetails2Component implements OnInit {

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  
  @Input() public petDetails2: FormGroup;

  public events: string[] = [];
  public imagePreviews: any[] = [];

  public fileRestrictions: FileRestrictions = {
    allowedExtensions: ['.jpg', '.png']
  };

  public removeEventHandler(e: RemoveEvent): void {
      this.log(`Removing ${e.files[0].name}`);

      const index = this.imagePreviews.findIndex(item => item.uid === e.files[0].uid);

      if (index >= 0) {
      this.imagePreviews.splice(index, 1);
      }
  }

  public selectEventHandler(e:SelectEvent): void {
    //console.log(this.petDetails2.value);
    //const file = e.files[0];
    let i = 0;
    
    e.files.forEach((file) => {
      if (!file.validationErrors) {
        const filePath = 'images/'+ file.name;
        console.log(file.name);
        const fileRef = this.storage.ref(filePath);
        const task = this.storage.upload(filePath, file.rawFile);
        // observe percentage changes
        this.uploadPercent = task.percentageChanges();
        // get notified when the download URL is available
        task.snapshotChanges().pipe(
            finalize(() => fileRef.getDownloadURL().subscribe(url => {this.petDetails2.value.images[i] = url; i++;}) )
         )
        .subscribe()
      }
    })
    /*
      const that = this;

      e.files.forEach((file) => {
      that.log(`File selected: ${file.name}`);

      if (!file.validationErrors) {
          const reader = new FileReader();

          reader.onload = function (ev) {
          const image = {
              src: ev.target['result'],
              uid: file.uid
          };

          that.imagePreviews.unshift(image);
          };

          reader.readAsDataURL(file.rawFile);
      }
      });
      */
  }

  private log(event: string): void {
      this.events.unshift(`${event}`);
  }

  constructor(private storage: AngularFireStorage) { }

  ngOnInit(): void {
  }
/*
  public events: string[] = [];
  public imagePreviews: any[] = [];
  public uploadRestrictions: FileRestrictions = {
    allowedExtensions: ['.jpg', '.png']
  };

  public uploadSaveUrl = 'saveUrl'; // should represent an actual API endpoint
  public uploadRemoveUrl = 'removeUrl'; // should represent an actual API endpoint

  public clearEventHandler(): void {
    this.log('Clearing the file upload');
    this.imagePreviews = [];
  }

  public completeEventHandler() {
    this.log(`All files processed`);
  }

  public removeEventHandler(e: RemoveEvent): void {
    this.log(`Removing ${e.files[0].name}`);

    const index = this.imagePreviews.findIndex(item => item.uid === e.files[0].uid);

    if (index >= 0) {
      this.imagePreviews.splice(index, 1);
    }
  }

  public selectEventHandler(e: SelectEvent): void {
    const that = this;

    e.files.forEach((file) => {
      that.log(`File selected: ${file.name}`);

      if (!file.validationErrors) {
        const reader = new FileReader();

        reader.onload = function (ev) {
          const image = {
            src: ev.target['result'],
            uid: file.uid
          };

          that.imagePreviews.unshift(image);
        };

        reader.readAsDataURL(file.rawFile);
      }
    });
  }

  private log(event: string): void {
    this.events.unshift(`${event}`);
  }  
  */
}
