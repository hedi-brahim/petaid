import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-pet-details2',
  templateUrl: './pet-details2.component.html',
  styleUrls: ['./pet-details2.component.scss']
})
export class PetDetails2Component implements OnInit {

  @Input() public petDetails2: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

}
