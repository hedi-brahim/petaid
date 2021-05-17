import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  @Input() toggleRegister: boolean;
  @Output() toggleRegisterChange = new EventEmitter<boolean>();

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  close() {
    this.toggleRegister = false;
    this.toggleRegisterChange.emit(false);
  }
}
