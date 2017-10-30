import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  @Input()
  data: any;

  @Input()
  parentGroup: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
