import { Component, OnInit,  ElementRef, HostListener, ViewChild, ViewEncapsulation, } from '@angular/core';

@Component({
  selector: 'app-login-popup',
  templateUrl: './login-popup.component.html',
  styleUrls: ['./login-popup.component.scss']
})
export class LoginPopupComponent implements OnInit {

  @ViewChild("anchor") public anchor: ElementRef;
  @ViewChild("popup", { read: ElementRef }) public popup: ElementRef;

  public toggleLogIn = false; 

  constructor() { }

  ngOnInit(): void {
  }

  @HostListener("keydown", ["$event"])
  public keydown(event: any): void {
    if (event.keyCode === 27) {
      this.exitLogIn();
    }
  }

  @HostListener("document:click", ["$event"])
  public documentClick(event: any): void {
    if (!this.contains(event.target)) {
      this.exitLogIn();
    }
  }

  private contains(target: any): boolean {
    return (
      this.anchor.nativeElement.contains(target) ||
      (this.popup ? this.popup.nativeElement.contains(target) : false)
    );
  }

  public switchLogIn() {
    this.toggleLogIn = !this.toggleLogIn;
}

  public exitLogIn() {
    this.toggleLogIn = false;
  }
  
}
