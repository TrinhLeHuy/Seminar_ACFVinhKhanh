/**
 * QR Scanner Page - View
 */

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { QRScanner } from "@/components/QRScanner";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function QRScannerPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Quay lại
        </Button>

        <div className="max-w-2xl mx-auto">
          <QRScanner />
        </div>
      </main>

      <Footer />
    </div>
  );
}
