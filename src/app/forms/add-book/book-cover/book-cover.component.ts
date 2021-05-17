import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FileRestrictions, SelectEvent, RemoveEvent } from '@progress/kendo-angular-upload';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-book-cover',
  templateUrl: './book-cover.component.html',
  styleUrls: ['./book-cover.component.scss']
})
export class BookCoverComponent implements OnInit {
  
  @Input() public bookCover: FormGroup;

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  public events: string[] = [];
  public imagePreviews: any[] = [];

  constructor(private storage: AngularFireStorage) { }

  ngOnInit(): void {
  }

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
            finalize(() => fileRef.getDownloadURL().subscribe(url => {this.bookCover.value.images[i] = url; i++;}) )
         )
        .subscribe()
      }
    })
  }

  private log(event: string): void {
      this.events.unshift(`${event}`);
  }

}
