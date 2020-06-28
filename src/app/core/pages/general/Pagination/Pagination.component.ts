import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { PagerService } from './pagination.service';

@Component({
  selector: 'pagination',
  templateUrl: './Pagination.component.html',
  styleUrls: ['./Pagination.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PaginationComponent implements OnInit {


  @Input() pageIndex: number; // current offset
  @Input() limit: number; // record per page
  @Input() total: number; // total records
  @Input() range: number = 5;
  @Output() pageChange: EventEmitter<any>;

  totalPageNo : number [];
  totalSizeOfPages : number;
  constructor(private pagerService: PagerService) {
    this.total = 0;
    this.totalSizeOfPages = 0;
    this.totalPageNo = [];
    this.pageChange = new EventEmitter<any>()
  }

  ngOnInit() {
  }

  ngOnChanges() {
    this.totalSizeOfPages = this.total / this.limit;
    this.totalSizeOfPages = Math.ceil(this.totalSizeOfPages); 
    
    this.totalPageNo = [];
    for(let i=1; i <= this.totalSizeOfPages; i++){
      this.totalPageNo.push(i);
    }
  }

  pageChangeBackward(){
    if(this.pageIndex > 0)
    this.pageIndex = this.pageIndex-1;
    this.pageChange.emit(this.pageIndex); 
  }

  pageChangeIndex(index : number){
    this.pageIndex = index;
    this.pageChange.emit(this.pageIndex);
  }

  pageChangeForward(){
    if(this.pageIndex < this.totalSizeOfPages)
    this.pageIndex = this.pageIndex+1;
    this.pageChange.emit(this.pageIndex);
  }
}
