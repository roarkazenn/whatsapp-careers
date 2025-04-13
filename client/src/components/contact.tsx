import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { contactFormSchema, type ContactMessage } from "@shared/schema";

export function Contact() {
  const { toast } = useToast();
  
  const form = useForm<ContactMessage>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: ""
    }
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: ContactMessage) => {
      await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      form.reset();
      toast({
        title: "Tin nhắn đã được gửi",
        description: "Cảm ơn bạn đã liên hệ, chúng tôi sẽ phản hồi trong thời gian sớm nhất.",
      });
    }
  });

  const onSubmit = (data: ContactMessage) => {
    mutate(data);
  };

  return (
    <section id="lien-he" className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2 bg-whatsapp-green p-8 text-white">
            <h2 className="text-2xl font-bold mb-6">Liên hệ với chúng tôi</h2>
            <p className="mb-6">Nếu bạn có thắc mắc về vị trí tuyển dụng hoặc quá trình ứng tuyển, đừng ngần ngại liên hệ với đội ngũ tuyển dụng của chúng tôi.</p>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 mt-1" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-sm mt-1">careers@whatsapp.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 mt-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="font-medium">Địa chỉ</p>
                  <p className="text-sm mt-1">Tòa nhà Landmark 72, Keangnam, Phạm Hùng, Hà Nội</p>
                  <p className="text-sm">Tòa nhà Bitexco Financial, Quận 1, TP. Hồ Chí Minh</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 mt-1" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <div>
                  <p className="font-medium">Điện thoại</p>
                  <p className="text-sm mt-1">+84 (0) 123 456 789</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2 p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Gửi tin nhắn</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-gray-700 text-sm font-medium mb-1">Họ và tên</FormLabel>
                      <FormControl>
                        <Input 
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-whatsapp-green" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-gray-700 text-sm font-medium mb-1">Email</FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-whatsapp-green" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-gray-700 text-sm font-medium mb-1">Chủ đề</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-whatsapp-green">
                            <SelectValue placeholder="Chọn chủ đề" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="job-inquiry">Hỏi về vị trí tuyển dụng</SelectItem>
                          <SelectItem value="application-status">Trạng thái đơn ứng tuyển</SelectItem>
                          <SelectItem value="general">Câu hỏi chung</SelectItem>
                          <SelectItem value="other">Khác</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="block text-gray-700 text-sm font-medium mb-1">Tin nhắn</FormLabel>
                      <FormControl>
                        <Textarea 
                          rows={4} 
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-whatsapp-green" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  disabled={isPending}
                  className="bg-whatsapp-green text-white px-6 py-2 rounded-lg hover:bg-whatsapp-light transition flex items-center"
                >
                  <span>{isPending ? "Đang gửi..." : "Gửi tin nhắn"}</span>
                  {!isPending && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11h2v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                    </svg>
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
