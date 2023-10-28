import { Html5QrcodeScanner } from "html5-qrcode";
import React, { useEffect, useState } from "react";

const QRreader: React.FC = () => {
  const [scanResult, setScanResult] = useState<string | null>(null);

  // Setting scanner. 
  useEffect(() => {
    const scanner = new Html5QrcodeScanner('reader', {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 5,
    });

    // Handle successfula and failed scan.
    scanner.render(success, error);

    function success(result: string): void {
      scanner.clear();
      setScanResult(result);
    }
    function error(err: any) {
      console.warn(err);
    }
  }, []);

  // Successful scan --> Render link.
  // TODO: delete http// on line 36, to make link work, alter to make work in app.
  return (
    <div className="qr-reader">
      <h2>Skannaa QR koodi:</h2>
      {scanResult ? (
        <div>
          Success: <a href={"http://" + scanResult}>{scanResult}</a>
        </div>
      ) : (
        <div id="reader"></div>
      )}
    </div>
  );
};

export default QRreader;