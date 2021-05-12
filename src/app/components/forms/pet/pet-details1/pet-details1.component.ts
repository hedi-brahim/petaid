import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FileRestrictions } from '@progress/kendo-angular-upload';

@Component({
  selector: 'app-pet-details1',
  templateUrl: './pet-details1.component.html',
  styleUrls: ['./pet-details1.component.scss']
})
export class PetDetails1Component implements OnInit {

  public uploadSaveUrl = 'saveUrl'; // should represent an actual API endpoint
  public uploadRemoveUrl = 'removeUrl'; // should represent an actual API endpoint

  public restrictions: FileRestrictions = {
      allowedExtensions: ['jpg', 'jpeg', 'png']
  };

  @Input() public petDetails1: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

}
