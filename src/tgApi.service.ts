import * as Axios from 'axios';
import { Inject, Injectable } from "@nestjs/common";

import { TG_API_TOKEN } from "./tgApi.constants";

const responseInterceptor = response => response.data;

@Injectable()
export class TgApiService {
  private apiClient: Axios.AxiosInstance;
  private filesClient: Axios.AxiosInstance;

  constructor(
    @Inject(TG_API_TOKEN) private token: string,
  ) {
    this.apiClient = Axios.default.create({
      baseURL: `https://api.telegram.org/bot${this.token}`,
    });
    this.filesClient = Axios.default.create({
      baseURL: `https://api.telegram.org/file/bot${this.token}`,
    });

    this.apiClient.interceptors.response.use(responseInterceptor);
    this.filesClient.interceptors.response.use(responseInterceptor);
  }

  public async sendMessage(chatId: number, text: string, replyMarkup?: any) {
    return this.apiClient.get('/sendMessage', {
      params: {
        chat_id: chatId,
        text,
        reply_markup: replyMarkup,
      },
    });
  }

  public async getUserInfo(chatId: number) {
    return this.apiClient.get('/getChat', {
      params: {
        chat_id: chatId,
      },
    }).then((result: any) => result.result);
  }

  public async getFile(fileId: number) {
    const file: any = await this.apiClient.get('/getFile', {
      params: { file_id: fileId },
    });
    return this.filesClient.get(file.result.file_path);
  }
}
