import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { NotifyService } from './notify.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})


export class ProfileService {
  headers: HttpHeaders = new HttpHeaders();
  headerOptions: any;
  params: any;
  constructor(
    private route: Router,
    private http: HttpClient,
    private _notify: NotifyService
  ) {
    this.headers.set('Content-Type', 'application/x-www-form-urlencoded');
  }

  getHeaderOptions() {
    const options = {
      headers: this.headers,
      params: this.params,
      observe: 'response',
      responseType: 'json',
    }
    return options;
  }

  getProfileListSlide(): Observable<any> {
    const url = environment.baseURI + "/api/slickList";
    this.params = "";
    const headerOptions: any = this.getHeaderOptions();
    return this.http.get(url, headerOptions).pipe(
      map((res: any) => {
        const response = res.body;
        return response;
      }),
      catchError(e => this._error(e))
    );
  }

  getAllProfileList(params : any): Observable<any> {
    const url = environment.baseURI + "/api/allList";
    this.params = params;
    const headerOptions: any = this.getHeaderOptions();
    return this.http.get(url, headerOptions).pipe(
      map((res: any) => {
        const response = res.body;
        return response;
      }),
      catchError(e => this._error(e))
    );
  }

  getProfileDetail(params: any): Observable<any> {
    const url = environment.baseURI + "/api/detail";
    this.params = params;
    const headerOptions: any = this.getHeaderOptions();
    return this.http.get(url, headerOptions).pipe(
      map((res: any) => {
        const response = res.body;
        return response;
      }),
      catchError(e => this._error(e))
    );
  }

  saveProfile(body: Object): Observable<any> {
    const url = environment.baseURI + "/api/create";
    this.params = "";
    const headerOptions: any = this.getHeaderOptions();
    return this.http.post(url, body, headerOptions)
      .pipe(
        map((res: any) => {
          const response = res.body;
          return response;
        }),
        catchError(e => this._error(e))
      );
  }

  updateProfile(body: Object, id: any): Observable<any> {
    const url = environment.baseURI + "/api/update/" + id;
    this.params = "";
    const headerOptions: any = this.getHeaderOptions();
    return this.http.put(url, body, headerOptions)
      .pipe(
        map((res: any) => {
          const response = res.body;
          return response;
        }),
        catchError(e => this._error(e))
      );
  }

  saveProject(body: Object): Observable<any> {
    const url = environment.baseURI + "/api/project/create";
    this.params = "";
    const headerOptions: any = this.getHeaderOptions();
    return this.http.post(url, body, headerOptions)
      .pipe(
        map((res: any) => {
          const response = res.body;
          return response;
        }),
        catchError(e => this._error(e))
      );
  }

  deleteProject(params: any): Observable<any> {
    const url = environment.baseURI + "/api/project/delete";
    this.params = params;
    const headerOptions: any = this.getHeaderOptions();
    return this.http.delete(url, headerOptions).pipe(
      map((res: any) => {
        const response = res.body;
        return response;
      }),
      catchError(e => this._error(e))
    );
  }

  deleteProfile(params: any): Observable<any> {
    const url = environment.baseURI + "/api/delete";
    this.params = params;
    const headerOptions: any = this.getHeaderOptions();
    return this.http.delete(url, headerOptions).pipe(
      map((res: any) => {
        const response = res.body;
        return response;
      }),
      catchError(e => this._error(e))
    );
  }


  _error(error: HttpErrorResponse): any {
    switch (error.status) {
      case 404:
        this._notify.showError(error.error.msg, 'PROFILE');
        this.route.navigate(['/page-not-found']);
        break;

      case 500:
        var message = "Server error please try later.";
        this._notify.showError(message, 'SERVER');
        this.route.navigate(['/server-error']);
        break;

    }
    return throwError(error);
  }
}
