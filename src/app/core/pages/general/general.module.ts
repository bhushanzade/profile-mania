import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JumbotronComponent } from './jumbotron/jumbotron.component';
import { NumformaterPipe } from './pipes/numformater.pipe';
import { PaginationComponent } from './Pagination/Pagination.component';

const Components = [
  JumbotronComponent,
  NumformaterPipe,
  PaginationComponent
]

@NgModule({
  declarations: [...Components],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[...Components]
})
export class GeneralModule { }
