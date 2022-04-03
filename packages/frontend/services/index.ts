import {HttpConfig, httpFactory} from "./http";
import ApiErrorInterceptor from "./interceptors/api-error.interceptor";

const Http = httpFactory(HttpConfig);

Http.interceptors.response.use((res) => (res), ApiErrorInterceptor)

export {Http}