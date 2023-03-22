import { Injectable } from '@nestjs/common';

import { WebSiteDataModel } from './types';
import { getMatchedSync } from './intercepter';
import { ConfigService } from '@nestjs/config';
import * as WebsitesMock from './websites_mock.json';
import * as FilesMock from './files_mock.json';

console.log(WebsitesMock);

@Injectable()
export class IntercepterService {
  constructor(private readonly configService: ConfigService) {}

  get websites(): Record<string, WebSiteDataModel> {
    // return this.configService.get('WEBSITES');
    return WebsitesMock as Record<string, WebSiteDataModel>;
  }

  async readHtml(urlObj: URL) {
    const matchedData = getMatchedSync(urlObj, this.websites);
    if (!matchedData) return null;
    const { data } = matchedData;
    if (!data) return null;
    const html = FilesMock[data.pageId];
    return html;
  }
}
