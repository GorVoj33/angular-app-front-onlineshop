import { Component, OnInit } from '@angular/core';
import { moveIn, fallIn } from 'src/app/router.animation';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css'],
  animations: [moveIn(), fallIn()],
  host: {'[@moveIn':''}
})
export class AboutUsComponent implements OnInit {
  state: string = '';
  constructor() { }

  ngOnInit() {
  }

}
