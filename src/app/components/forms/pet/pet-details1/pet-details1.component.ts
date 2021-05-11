import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-pet-details1',
  templateUrl: './pet-details1.component.html',
  styleUrls: ['./pet-details1.component.scss']
})
export class PetDetails1Component implements OnInit {

  @Input() public petDetails1: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

}
