import { HomeRoutes } from '../../core/routing/home.routing';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { GeneralModule } from 'src/app/core/pages/general/general.module';
import { ProfileService } from 'src/app/shared/services/profile.service';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(HomeRoutes),
    SlickCarouselModule,
    GeneralModule
  ],
  providers:[ProfileService]
})
export class HomeModule { }
