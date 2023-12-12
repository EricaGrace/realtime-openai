import { Injectable } from '@nestjs/common';
import { OpenAIAPI } from 'openai';

@Injectable()
export class OpenAIService {
  private readonly openai: OpenAIAPI;

  constructor() {
    this.openai = new OpenAIAPI("clé api");
  }

  async translate(message: string, targetLanguage: string): Promise<string> {
    try {
      const response = await this.openai.translate(message, { to: targetLanguage });
      return response.data.translations[0].translatedText;
    } catch (error) {
      console.error("Error translating message:", error);
      return message;
    }
  }

  async checkAccuracy(text: string): Promise<boolean> {
    try {
      const response = await this.openai.someApiCall(text);
      return response.isAccurate;
    } catch (error) {
      console.error("Non exact:", error);
      return false;
    }
  }
}
