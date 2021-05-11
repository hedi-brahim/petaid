import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-pet-details3',
  templateUrl: './pet-details3.component.html',
  styleUrls: ['./pet-details3.component.scss']
})
export class PetDetails3Component implements OnInit {

  @Input() public petDetails3: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

} 
