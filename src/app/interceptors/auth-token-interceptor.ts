import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { SKIP_TOKEN } from '../utils/token.context';

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
    if (req.context.get(SKIP_TOKEN) || !req.url.startsWith(environment.apiCubos)) {
        return next(req);
    }
    let token = sessionStorage.getItem("TOKEN");
    if (token) {
        let tokenRequest = req.clone({
            setHeaders: {Authorization: "bearer " + token}
        });
        return next(tokenRequest);
    }
    return next(req);
};
