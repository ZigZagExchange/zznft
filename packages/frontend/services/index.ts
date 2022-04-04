import {HttpConfig, httpFactory} from "./http";
import ApiErrorInterceptor from "./interceptors/api-error.interceptor";
import ApiAuthInterceptor from "./interceptors/api-auth.interceptor";

const Http = httpFactory(HttpConfig);

Http.interceptors.response.use((res) => (res), ApiErrorInterceptor);
Http.interceptors.request.use(ApiAuthInterceptor, error => error)

export {Http}