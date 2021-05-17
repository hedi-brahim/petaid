import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  @Input() toggleLogIn: boolean;
  @Output() toggleLogInChange = new EventEmitter<boolean>();

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  close() {
    this.toggleLogIn = false;
    this.toggleLogInChange.emit(false);
  }

}
