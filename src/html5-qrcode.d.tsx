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
  
      render(onScanSuccess: (result: string) => void, onScanError: (error: any) => void): void;
  
      clear(): void;
    }
  }