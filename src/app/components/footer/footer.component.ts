import { Component, OnInit } from '@angular/core';
import { bariatric } from '../../models/bariatric';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  year:Number = new Date().getFullYear();
  footer: any;

  constructor() { }

  ngOnInit() {
    let footerIndex = bariatric.findIndex(item => item.footer);
    this.footer = footerIndex != -1 ? bariatric[footerIndex].footer : null;
  }

}
