import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-jumbotron',
  templateUrl: './jumbotron.component.html',
  styleUrls: ['./jumbotron.component.scss']
})
export class JumbotronComponent implements OnInit {

  @Input() GetText : string = '';
  @Input() ButtonText : string = '';
  @Input() ButtonRouter : string = '';
  
  constructor() { }

  ngOnInit(): void {
  }

}
