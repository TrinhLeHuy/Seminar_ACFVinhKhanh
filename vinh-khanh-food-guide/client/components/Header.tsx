import { Link, useNavigate } from "react-router-dom";
import { ChefHat, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-orange-200 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-orange-500">
              <ChefHat className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-gray-900">Vĩnh Khánh</h1>
              <p className="text-xs text-orange-600">Phố Ẩm Thực</p>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/qr-scanner')}
              className="text-gray-600 hover:text-orange-600"
            >
              <QrCode className="h-4 w-4 mr-2" />
              Quét QR
            </Button>
          </nav>

          <Button
            onClick={() => navigate('/qr-scanner')}
            className="sm:inline-flex hidden px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg text-sm font-medium hover:shadow-lg transition"
          >
            <QrCode className="h-4 w-4 mr-2" />
            Quét QR
          </Button>
        </div>
      </div>
    </header>
  );
};
