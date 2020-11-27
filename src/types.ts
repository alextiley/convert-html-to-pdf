/**
 * Configuration for the express-html-to-pdf middleware.
 */
export interface HTMLToPDFOptions {
  /**
   * The Puppeteer launch options configuration.
   * @default { args: ['--font-render-hinting=none'] }
   */
  browserOptions?: LaunchOptions;
  /**
   * The Puppeteer PDF options configuration.
   * @default { printBackground: true }
   */
  pdfOptions?: PDFOptions;
  /**
   * By default, we assume the PDF document supplied will not contain requests over HTTP
   * (for fastest possible PDF generation). Typically you can embed resources by base64
   * encoding them as data URI's. If you have HTML that pulls assets or other resources over HTTP,
   * set this to true.
   * @default false
   */
  waitForNetworkIdle?: boolean;
  
  /**
  * Delays render
  */
  delayRenderInMs?: number;
}

/**
 * Accepts values labeled with units. If number, treat as pixels.
 */
export type LayoutDimension = string | number;

/**
 * Pre-defined PDF formats.
 */
export type PDFFormat =
  'Letter'
  | 'Legal'
  | 'Tabloid'
  | 'Ledger'
  | 'A0'
  | 'A1'
  | 'A2'
  | 'A3'
  | 'A4'
  | 'A5';

/**
 * The Puppeteer PDF options configuration.
 */
export interface PDFOptions {
  /**
   * The file path to save the PDF to.
   * If `path` is a relative path, then it is resolved relative to current working directory.
   * If no path is provided, the PDF won't be saved to the disk.
   */
  path?: string;
  /**
   * Scale of the webpage rendering.
   * @default 1
   */
  scale?: number;
  /**
   * Display header and footer.
   * @default false
   */
  displayHeaderFooter?: boolean;
  /**
   * HTML template for the print header. Should be valid HTML markup with following classes used to inject printing values into them:
   * - `date` formatted print date
   * - `title` document title
   * - `url` document location
   * - `pageNumber` current page number
   * - `totalPages` total pages in the document
   */
  headerTemplate?: string;
  /**
   * HTML template for the print footer. Should be valid HTML markup with following classes used to inject printing values into them:
   * - `date` formatted print date
   * - `title` document title
   * - `url` document location
   * - `pageNumber` current page number
   * - `totalPages` total pages in the document
   */
  footerTemplate?: string;
  /**
   * Print background graphics.
   * @default true
   */
  printBackground?: boolean;
  /**
   * Paper orientation.
   * @default false
   */
  landscape?: boolean;
  /**
   * Paper ranges to print, e.g., '1-5, 8, 11-13'.
   * @default '' which means print all pages.
   */
  pageRanges?: string;
  /**
   * Paper format. If set, takes priority over width or height options.
   * @default 'Letter'
   */
  format?: PDFFormat;
  /** Paper width. */
  width?: LayoutDimension;
  /** Paper height. */
  height?: LayoutDimension;
  /** Paper margins, defaults to none. */
  margin?: {
    /** Top margin. */
    top?: LayoutDimension;
    /** Right margin. */
    right?: LayoutDimension;
    /** Bottom margin. */
    bottom?: LayoutDimension;
    /** Left margin. */
    left?: LayoutDimension;
  };
  /**
   * Give any CSS @page size declared in the page priority over what is declared in width and
   * height or format options.
   * @default false which will scale the content to fit the paper size.
   */
  preferCSSPageSize?: boolean;
}

/**
 * The Puppeteer launch options configuration.
 */
export interface LaunchOptions {
  /**
   * Path to a Chromium executable to run instead of bundled Chromium. If
   * executablePath is a relative path, then it is resolved relative to current
   * working directory.
   */
  executablePath?: string;
  /**
   * Do not use `puppeteer.defaultArgs()` for launching Chromium.
   * @default false
   */
  ignoreDefaultArgs?: boolean | string[];
  /**
   * Close chrome process on Ctrl-C.
   * @default true
   */
  handleSIGINT?: boolean;
  /**
   * Close chrome process on SIGTERM.
   * @default true
   */
  handleSIGTERM?: boolean;
  /**
   * Close chrome process on SIGHUP.
   * @default true
   */
  handleSIGHUP?: boolean;
  /**
   * Whether to pipe browser process stdout and stderr into process.stdout and
   * process.stderr.
   * @default false
   */
  dumpio?: boolean;
  /**
   * Specify environment variables that will be visible to Chromium.
   * @default `process.env`.
   */
  env?: {
    [key: string]: string | boolean | number;
  };
  /**
   * Connects to the browser over a pipe instead of a WebSocket.
   * @default false
   */
  pipe?: boolean;
  /**
   * Maximum navigation time in milliseconds, pass 0 to disable timeout.
   * @default 30000
   */
  timeout?: number;
  /**
   * Whether to ignore HTTPS errors during navigation.
   * @default false
   */
  ignoreHTTPSErrors?: boolean;
  /**
   * Sets a consistent viewport for each page. Defaults to an 800x600 viewport. null disables the default viewport.
   */
  defaultViewport?: {
    /**
     * page width in pixels.
     */
    width?: number;
    /**
     * page height in pixels.
     */
    height?: number;
    /**
     * Specify device scale factor (can be thought of as dpr).
     * @default 1
     */
    deviceScaleFactor?: number;
    /**
     * Whether the meta viewport tag is taken into account.
     * @default false
     */
    isMobile?: boolean;
    /**
     * Specifies if viewport supports touch events.
     * @default false
     */
    hasTouch?: boolean;
    /**
     * Specifies if viewport is in landscape mode.
     * @default false
     */
    isLandscape?: boolean;
  } | null;
  /**
   * Slows down Puppeteer operations by the specified amount of milliseconds.
   * Useful so that you can see what is going on.
   */
  slowMo?: number;
  /**
   * Whether to run browser in headless mode.
   * @default true unless the devtools option is true.
   */
  headless?: boolean;
  /**
   * Additional arguments to pass to the browser instance.
   * The list of Chromium flags can be found here.
   * @default ['----font-render-hinting=none']
   */
  args?: string[];
  /**
   * Path to a User Data Directory.
   */
  userDataDir?: string;
  /**
   * Whether to auto-open a DevTools panel for each tab.
   * If this option is true, the headless option will be set false.
   */
  devtools?: boolean;
}
