import { puppeteer } from '../__mocks__/puppeteer';
import basicMarkup from '../__fixtures__/basic';
import HTMLToPDF from '../';

describe('unit tests', () => {
  describe('convert', () => {
    it('should disable font render hinting by default, to ensure fonts render reliably across all platforms', async () => {
      const htmlToPDF = new HTMLToPDF(basicMarkup);
      await htmlToPDF.convert();

      expect(puppeteer.launch).toHaveBeenCalledWith(expect.objectContaining({
        args: ['--font-render-hinting=none'],
      }));
    });

    it('should allow font render hinting to be enabled via browser configuration', async () => {
      const htmlToPDF = new HTMLToPDF(basicMarkup, {
        browserOptions: {
          args: [],
        },
      });
      await htmlToPDF.convert();

      expect(puppeteer.launch).toHaveBeenCalledWith(expect.objectContaining({
        args: [],
      }));
    });

    it('should support custom browser settings, via configuration', async () => {
      const htmlToPDF = new HTMLToPDF(basicMarkup, {
        browserOptions: {
          timeout: 5000,
        },
      });
      await htmlToPDF.convert();

      expect(puppeteer.launch).toHaveBeenCalledWith(expect.objectContaining({
        timeout: 5000,
      }));
    });

    it('should ensure custom browser options play well with default browser options', async () => {
      const htmlToPDF = new HTMLToPDF(basicMarkup, {
        browserOptions: {
          timeout: 9999,
        },
      });
      await htmlToPDF.convert();

      expect(puppeteer.launch).toHaveBeenCalledWith(expect.objectContaining({
        args: ['--font-render-hinting=none'],
        timeout: 9999,
      }));
    });
  });

  describe('createDataUri', () => {
    it('should convert a HTML string to base64', () => {
      const uri = HTMLToPDF.createDataUri('<p>Hello world</p>', 'text/html');

      expect(uri).toEqual('data:text/html;base64,PHA+SGVsbG8gd29ybGQ8L3A+');
    });

    it('should convert a file buffer to base64', () => {
      const buffer = Buffer.from('<p>Hello world</p>', 'utf8');
      const uri = HTMLToPDF.createDataUri(buffer, 'text/html');

      expect(uri).toEqual('data:text/html;base64,PHA+SGVsbG8gd29ybGQ8L3A+');
    });
  });
});
