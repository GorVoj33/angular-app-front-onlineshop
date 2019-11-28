import { Component, OnInit, Input } from '@angular/core';
import { ThemePalette } from '@angular/material';
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() pageTitle: string;
  @Input() color: ThemePalette;
  @Input() helpTitle: string;
  counter = 0;
  userStatusColor = "warn";
  constructor(private _backendservice :BackendService) { }

  ngOnInit() {
    this.counter = 0;
    this._backendservice.getCartItemsNumber().subscribe(
      (res) => {
        this.counter=res;
      }
    );
    this._backendservice.isUserLogged().subscribe(
      (res) => {
        this.userStatusColor = res ? "primary":"warn";
      }
    );
  }

}
