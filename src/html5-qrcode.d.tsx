declare module 'html5-qrcode' {
    export interface Html5QrcodeScannerConfig {
      qrbox?: {
        width: number;
        height: number;
      };
      fps?: number;
      verbose?: boolean;
    }
  
    export class Html5QrcodeScanner {
      constructor(
        elementId: string,
        config: Html5QrcodeScannerConfig,
        verbose?: boolean
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      render(onScanSuccess: (result: string) => void, onScanError: (error: any) => void): void;
  
      clear(): void;
    }
  }