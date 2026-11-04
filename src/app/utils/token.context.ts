import { HttpContextToken } from "@angular/common/http";

export const SKIP_TOKEN = new HttpContextToken<boolean>(() => false);
