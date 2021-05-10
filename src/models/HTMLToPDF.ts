import isArray from 'lodash/fp/isArray';
import mergeWith from 'lodash/fp/mergeWith';
import puppeteer from 'puppeteer';
import { HTMLToPDFOptions } from '../types';

export default class HTMLToPDF {
  private _html: string;

  private _options: HTMLToPDFOptions = {
    browserOptions: {
      args: ['--font-render-hinting=none', '--no-sandbox'],
    },
    pdfOptions: {
      printBackground: true,
    },
    waitForNetworkIdle: false,
  };

  constructor(html: string, options?: HTMLToPDFOptions) {
    if (options) {
      this._options = this.mergeOptions(this._options, options);
    }
    this._html = html;
  }

  public set html(html: string) {
    this._html = html;
  }

  public set options(options: HTMLToPDFOptions) {
    this._options = this.mergeOptions(this._options, options);
  }

  public convert(): Promise<Buffer> {
    return new Promise(async (res, rej) => {
      const browser = await puppeteer.launch(this._options.browserOptions);
      const page = await browser.newPage();

      page.on('error', async (err) => {
        await browser.close();
        rej(err);
      });

      if (this._options.waitForNetworkIdle) {
        const html = HTMLToPDF.createDataUri(this._html, 'text/html');
        await page.goto(html, { waitUntil: 'networkidle0' });
      } else {
        await page.setContent(this._html);
      }

      try {
        const pdf = await page.pdf(this._options.pdfOptions);
        await browser.close();
        res(pdf);
      } catch (err) {
        await browser.close();
        rej(new Error(`Error whilst generating PDF: ${err.message}`));
      }
    });
  }

  public static createDataUri = (data: Buffer | string, mimeType: string) => {
    const asBuffer = data instanceof Buffer ? data : Buffer.from(data);
    const asBase64 = asBuffer.toString('base64');
    return `data:${mimeType};base64,${asBase64}`;
  };

  private mergeOptions = mergeWith((objValue, srcValue) => {
    if (isArray(objValue)) {
      if (srcValue.length === 0) {
        return objValue = srcValue;
      }
      return objValue.concat(srcValue);
    }
  });
}
