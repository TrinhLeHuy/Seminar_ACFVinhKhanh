/**
 * Admin Dashboard - Trang quản trị chính
 */

import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  LogOut, 
  MapPin, 
  Utensils, 
  Headphones, 
  QrCode, 
  Users, 
  LayoutDashboard,
  Home,
  Settings
} from 'lucide-react';

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Menu items cho dashboard
  const menuItems = [
    {
      title: 'Quản lý Địa điểm',
      description: 'Thêm, sửa, xóa các địa điểm ẩm thực',
      icon: MapPin,
      href: '/admin/locations',
      color: 'from-red-500 to-orange-500',
      count: null, // Sẽ cập nhật sau khi có API count
    },
    {
      title: 'Quản lý Món ăn',
      description: 'Quản lý menu và giá các món ăn',
      icon: Utensils,
      href: '/admin/foods',
      color: 'from-orange-500 to-yellow-500',
      count: null,
    },
    {
      title: 'Quản lý Audio Guide',
      description: 'Thêm file audio thuyết minh đa ngôn ngữ',
      icon: Headphones,
      href: '/admin/audio-guides',
      color: 'from-blue-500 to-cyan-500',
      count: null,
    },
    {
      title: 'Quản lý QR Code',
      description: 'Tạo và quản lý mã QR cho địa điểm',
      icon: QrCode,
      href: '/admin/qr-codes',
      color: 'from-purple-500 to-pink-500',
      count: null,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 hidden lg:block">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-gray-100">
            <Link to="/" className="flex items-center gap-3">
              <span className="text-3xl">🍜</span>
              <div>
                <h1 className="font-bold text-gray-900">Vĩnh Khánh</h1>
                <p className="text-xs text-gray-500">Admin Panel</p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            <Link
              to="/admin"
              className="flex items-center gap-3 px-4 py-3 rounded-lg bg-orange-50 text-orange-600 font-medium"
            >
              <LayoutDashboard className="h-5 w-5" />
              Dashboard
            </Link>
            
            {menuItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 transition"
              >
                <item.icon className="h-5 w-5" />
                {item.title.replace('Quản lý ', '')}
              </Link>
            ))}
          </nav>

          {/* User Info */}
          <div className="p-4 border-t border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white font-bold">
                {user?.username?.charAt(0).toUpperCase() || 'A'}
              </div>
              <div>
                <p className="font-medium text-gray-900">{user?.username}</p>
                <p className="text-xs text-gray-500">{user?.role}</p>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Đăng xuất
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-500">Chào mừng trở lại, {user?.username}!</p>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="outline" size="sm">
                  <Home className="h-4 w-4 mr-2" />
                  Xem trang chủ
                </Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="border-l-4 border-l-red-500">
              <CardHeader className="pb-2">
                <CardDescription>Tổng địa điểm</CardDescription>
                <CardTitle className="text-3xl">--</CardTitle>
              </CardHeader>
            </Card>
            <Card className="border-l-4 border-l-orange-500">
              <CardHeader className="pb-2">
                <CardDescription>Tổng món ăn</CardDescription>
                <CardTitle className="text-3xl">--</CardTitle>
              </CardHeader>
            </Card>
            <Card className="border-l-4 border-l-blue-500">
              <CardHeader className="pb-2">
                <CardDescription>Audio Guides</CardDescription>
                <CardTitle className="text-3xl">--</CardTitle>
              </CardHeader>
            </Card>
            <Card className="border-l-4 border-l-purple-500">
              <CardHeader className="pb-2">
                <CardDescription>Lượt quét QR</CardDescription>
                <CardTitle className="text-3xl">--</CardTitle>
              </CardHeader>
            </Card>
          </div>

          {/* Menu Cards */}
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quản lý nhanh</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {menuItems.map((item) => (
              <Link key={item.href} to={item.href}>
                <Card className="hover:shadow-lg transition cursor-pointer group">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center text-white group-hover:scale-110 transition`}>
                        <item.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{item.title}</CardTitle>
                        <CardDescription>{item.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
