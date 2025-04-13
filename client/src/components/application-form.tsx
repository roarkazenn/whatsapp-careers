import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { applicationFormSchema, type Application } from "@shared/schema";

interface ApplicationFormProps {
  jobId: number;
  onSubmitSuccess: () => void;
}

export function ApplicationForm({ jobId, onSubmitSuccess }: ApplicationFormProps) {
  const form = useForm<Application>({
    resolver: zodResolver(applicationFormSchema),
    defaultValues: {
      jobId,
      fullName: "",
      email: "",
      phone: "",
      portfolioUrl: "",
      coverLetter: ""
    }
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: Application) => {
      await apiRequest("POST", "/api/applications", data);
    },
    onSuccess: () => {
      form.reset();
      onSubmitSuccess();
    }
  });

  const onSubmit = (data: Application) => {
    mutate(data);
  };

  return (
    <div>
      <h4 className="font-medium text-gray-700 mb-4">Thông tin ứng viên</h4>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="fullName"
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
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-gray-700 text-sm font-medium mb-1">Số điện thoại</FormLabel>
                <FormControl>
                  <Input 
                    type="tel" 
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
            name="portfolioUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-gray-700 text-sm font-medium mb-1">Portfolio/LinkedIn (nếu có)</FormLabel>
                <FormControl>
                  <Input 
                    type="url" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-whatsapp-green" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">Tải lên CV (PDF, DOC, DOCX)</label>
            <Input 
              type="file" 
              accept=".pdf,.doc,.docx" 
              className="w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-whatsapp-green file:text-white hover:file:bg-whatsapp-light" 
            />
            <p className="text-xs text-gray-500 mt-1">Tính năng tải file sẽ được kích hoạt sau</p>
          </div>
          
          <FormField
            control={form.control}
            name="coverLetter"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-gray-700 text-sm font-medium mb-1">Thư ngỏ</FormLabel>
                <FormControl>
                  <Textarea 
                    rows={3} 
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
            className="w-full bg-whatsapp-green text-white py-2 rounded-lg hover:bg-whatsapp-light transition flex items-center justify-center"
          >
            <span>{isPending ? "Đang gửi..." : "Gửi đơn ứng tuyển"}</span>
            {!isPending && (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
