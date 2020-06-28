import { ToastrService, ToastrModule } from 'ngx-toastr';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/navbar/navbar.component';
import { AccessDeniedComponent } from './core/pages/access-denied/access-denied.component';
import { AppLayoutComponent } from './core/layout/app-layout/app-layout.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotifyService } from './shared/services/notify.service';
import { PageNotFoundComponent } from './core/pages/page-not-found/page-not-found.component';
import { ServerErrorComponent } from './core/pages/server-error/server-error.component';
import { FooterComponent } from './core/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AccessDeniedComponent,
    AppLayoutComponent,
    PageNotFoundComponent,
    ServerErrorComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [NotifyService, ToastrService],
  bootstrap: [AppComponent]
})
export class AppModule { }
