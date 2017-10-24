import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.css']
})
export class StepComponent implements OnInit {
  @Input() stepData: any;
  @Input() parentGroup: FormGroup;
  @Input() index: number;
  childGroupName: string;

  constructor() { }

  ngOnInit() {
  }

  setChildGroup(name: string): string {
    this.childGroupName = name;
    return name;
  }
  textInput(type: string): boolean {
    return (type === 'text' || type==="tel" || type === 'email');
  }

  textOrTel(type: string): string {
    if (type==='tel') return 'tel';
    else return 'text';
  }

  formatErrorMessage(question: string, el: string): string { 
    return this.parentGroup.get(this.childGroupName).get(el).hasError('required') ? 'Please tell us your ' + question.toLowerCase() :
      this.parentGroup.get(this.childGroupName).get(el).hasError('email') ? 'Please enter a valid email address' :
        '';
  }

  formatQuestion(question:string): string {
    return question.trim().toLowerCase().replace(/\s/g, '_');
  }

}


