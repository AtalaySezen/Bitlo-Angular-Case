// import { Injectable } from '@angular/core';
// import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
// import { catchError, Observable } from 'rxjs';
// import { AuthService } from 'src/@vex/services/auth.service';
// import { Router } from '@angular/router';
// import { environment } from 'src/environments/environment';

// @Injectable()
// export class ApiPrefixInterceptor implements HttpInterceptor {
//     private excludedUrlsRegex: RegExp[];
//     private excludedUrls = ['.svg', '.json'];
//     private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;

//     constructor(private auth: AuthService, private router: Router) {
//         this.excludedUrlsRegex =
//             this.excludedUrls.map(urlPattern => new RegExp(urlPattern, 'i')) || [];
//     }

//     intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//         const passThrough: boolean =
//             !!this.excludedUrlsRegex.find(regex => regex.test(request.url));
//         if (passThrough) {
//             return next.handle(request);
//         }

//         if (
//             !request.url.includes('Auth/Login')
//             && !request.url.includes('Auth/forgotPassword')
//             && !request.url.includes('Auth/verifyForgotPasswordToken')
//             && !request.url.includes('Auth/changePasswordWithToken')
//         ) {
//             const localData = JSON.parse(localStorage.getItem(`${this.authLocalStorageToken}`) || '');
//             const token = localData.data.token;
//             if (/^(http|https):/i.test(request.url)) {
//                 request = request.clone({
//                     setHeaders: { Authorization: `Bearer ${token}` }
//                 });
//             }
//         } else {
//             if (!/^(http|https):/i.test(request.url)) {
//                 request = request.clone({
//                     url: environment.apiUrl + request.url,
//                 });
//             }
//         }

//         return next.handle(request).pipe(
//             catchError(
//                 err =>
//                     new Observable<HttpEvent<any>>(observer => {
//                         if (err instanceof HttpErrorResponse) {
//                             const errResp = <HttpErrorResponse>err;
//                             if (errResp.status == 401) {
//                                 this.auth.Logout();
//                             }
//                         }
//                         observer.error(err);
//                         observer.complete();
//                     })
//             ))
//     }
// }