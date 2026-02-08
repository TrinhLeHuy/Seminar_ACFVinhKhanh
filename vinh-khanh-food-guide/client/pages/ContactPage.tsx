/**
 * ContactPage.tsx - Trang Liên hệ
 * 
 * Trang này cho phép khách hàng liên hệ với Phố Ẩm Thực Vĩnh Khánh.
 * Bao gồm: Form liên hệ, thông tin liên lạc, và bản đồ.
 */

import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle,
  Facebook,
  Instagram
} from "lucide-react";

export default function ContactPage() {
  // ========== STATE QUẢN LÝ FORM ==========
  // useState giúp lưu trữ giá trị form và trạng thái gửi
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);  // Đang gửi?
  const [isSubmitted, setIsSubmitted] = useState(false);    // Đã gửi thành công?

  // ========== HÀM XỬ LÝ THAY ĐỔI INPUT ==========
  // Khi người dùng nhập vào input, cập nhật state
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;  // Lấy name và value của input
    setFormData((prev) => ({
      ...prev,        // Giữ nguyên các giá trị cũ
      [name]: value,  // Cập nhật giá trị mới theo name
    }));
  };

  // ========== HÀM XỬ LÝ SUBMIT FORM ==========
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();  // Ngăn form reload trang
    setIsSubmitting(true);

    // Giả lập gửi form (trong thực tế sẽ gọi API)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Đánh dấu đã gửi thành công
    setIsSubmitted(true);
    setIsSubmitting(false);

    // Reset form sau 3 giây
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", phone: "", message: "" });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />

      {/* ========== HERO SECTION ========== */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-red-50" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-6xl mb-6 block">📞</span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Liên Hệ Với Chúng Tôi
            </h1>
            <p className="text-lg text-gray-600">
              Bạn có câu hỏi hoặc góp ý? Hãy liên hệ với chúng tôi, 
              chúng tôi luôn sẵn sàng hỗ trợ bạn!
            </p>
          </div>
        </div>
      </section>

      {/* ========== MAIN CONTENT ========== */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* ===== CỘT TRÁI: FORM LIÊN HỆ ===== */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Gửi Tin Nhắn
              </h2>

              {/* Hiển thị thông báo thành công */}
              {isSubmitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Gửi Thành Công!
                  </h3>
                  <p className="text-gray-600">
                    Cảm ơn bạn đã liên hệ. Chúng tôi sẽ phản hồi sớm nhất có thể.
                  </p>
                </div>
              ) : (
                /* Form liên hệ */
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Input: Họ tên */}
                  <div className="space-y-2">
                    <Label htmlFor="name">Họ và tên *</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Nhập họ tên của bạn"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>

                  {/* Input: Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="email@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>

                  {/* Input: Số điện thoại */}
                  <div className="space-y-2">
                    <Label htmlFor="phone">Số điện thoại</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="0xxx xxx xxx"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>

                  {/* Textarea: Nội dung */}
                  <div className="space-y-2">
                    <Label htmlFor="message">Nội dung tin nhắn *</Label>
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Nhập nội dung tin nhắn của bạn..."
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                    />
                  </div>

                  {/* Button: Gửi */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 py-3"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                        Đang gửi...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Gửi Tin Nhắn
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>

            {/* ===== CỘT PHẢI: THÔNG TIN LIÊN HỆ ===== */}
            <div className="space-y-8">
              {/* Card: Thông tin liên hệ */}
              <div className="bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl p-8 text-white">
                <h2 className="text-2xl font-bold mb-6">Thông Tin Liên Hệ</h2>
                
                <div className="space-y-6">
                  {/* Địa chỉ */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Địa chỉ</h3>
                      <p className="text-white/80">
                        Phố Ẩm Thực Vĩnh Khánh<br />
                        Quận 4, TP. Hồ Chí Minh
                      </p>
                    </div>
                  </div>

                  {/* Điện thoại */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Điện thoại</h3>
                      <p className="text-white/80">028.3943.XXXX</p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <p className="text-white/80">info@vinhkhanhfood.vn</p>
                    </div>
                  </div>

                  {/* Giờ hoạt động */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Giờ hoạt động</h3>
                      <p className="text-white/80">
                        Hàng ngày: 05:00 - 23:30
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="mt-8 pt-6 border-t border-white/20">
                  <h3 className="font-semibold mb-4">Theo dõi chúng tôi</h3>
                  <div className="flex gap-3">
                    <a 
                      href="#" 
                      className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center hover:bg-white/30 transition"
                    >
                      <Facebook className="w-5 h-5" />
                    </a>
                    <a 
                      href="#" 
                      className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center hover:bg-white/30 transition"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Card: Bản đồ */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                <div className="p-4 border-b border-gray-100">
                  <h3 className="font-semibold text-gray-900">Bản Đồ</h3>
                </div>
                {/* Placeholder cho bản đồ - có thể thay bằng Google Maps embed */}
                <div className="aspect-[4/3] bg-gray-100 flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <MapPin className="w-12 h-12 mx-auto mb-2 text-orange-500" />
                    <p className="text-sm">
                      Phố Vĩnh Khánh, Quận 4<br />
                      TP. Hồ Chí Minh
                    </p>
                    <a 
                      href="https://maps.google.com/?q=Vinh+Khanh+Street+District+4+Ho+Chi+Minh+City"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-3 text-orange-600 hover:text-orange-700 text-sm font-medium"
                    >
                      Xem trên Google Maps →
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
