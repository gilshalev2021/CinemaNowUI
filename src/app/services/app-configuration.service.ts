import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppConfigurationService {

  constructor(private httpClient: HttpClient){ }

  apiUrl: string;
  hubUrl: string;

  ensureInit(): Promise<any> {
    return new Promise((r, e) => {

      this.httpClient.get("../assets/config/config.json") //For Dev copy from dev_config.json, for Test copy from test_config.json
        .subscribe(
          (content: AppConfigurationService) => {
            Object.assign(this, content);
            r(this);
          },
          reason => e(reason));
    });

  }
}
