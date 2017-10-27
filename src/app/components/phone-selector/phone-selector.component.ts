import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-phone-selector',
  templateUrl: './phone-selector.component.html',
  styleUrls: ['./phone-selector.component.css']
})
export class PhoneSelectorComponent implements OnInit {
  isActive: boolean = false;
  constructor() { }

  ngOnInit() {
  }
}
