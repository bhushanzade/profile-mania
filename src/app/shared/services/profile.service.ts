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

  getAllProfileList(params: any): Observable<any> {
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
      case 400:
        const strings = error.error.views[0].toLowerCase();
        const subsstring = ['ensure this value is less than or equal to 2147483647'];
        var isFind = subsstring.map((term) => strings.includes(term)).includes(true);
        if (isFind) {
          var msg = "Please ensure integer value is less than or equal to 2147483647"
          this._notify.showError(strings, 'Count');
        }
        else
          this._notify.showError(error.error.views[0], 'PROFILE');
        break;
      case 404:
        this._notify.showError(error.error.msg, 'PROFILE');
        this.route.navigate(['/page-not-found']);
        break;

      case 500:
        var message = "Server error please try later.";
        this._notify.showError(message, 'SERVER');
        this.route.navigate(['/server-error']);
        break;
      default:
        var message = "Something went wrong please contact to technical support.";
        this._notify.showError(message, 'SERVER');
        break;
    }
    return throwError(error);
  }
}
