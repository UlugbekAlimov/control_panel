import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';

const TOKEN_STORAGE_KEY = 'auth_token';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem(TOKEN_STORAGE_KEY);
  if (!token) {
    return next(req);
  }

  const isApiCall =
    req.url.startsWith('/api/')
    || req.url.startsWith(`${environment.apiBaseUrl}/api/`);

  const isLoginCall = req.url.includes('/api/Auth/login');
  if (!isApiCall || isLoginCall) {
    return next(req);
  }

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  return next(authReq);
};
