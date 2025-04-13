import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { applicationFormSchema, type Application } from "@shared/schema";
import { useEffect, useState, useRef } from "react";
import { sendApplicationNotification } from "@/lib/emailService";

interface ApplicationFormProps {
  jobId: number;
  job?: {
    title: string;
  };
  onSubmitSuccess: () => void;
}

export function ApplicationForm({ jobId, job, onSubmitSuccess }: ApplicationFormProps) {
  const jobTitle = job?.title || `Vị trí ID: ${jobId}`;
  const [step, setStep] = useState(1);
  const [fileData, setFileData] = useState<File | null>(null);
  const [reviewMode, setReviewMode] = useState(false);
  const [countries, setCountries] = useState([
    { code: "us", name: "United States" },
    { code: "uk", name: "United Kingdom" },
    { code: "ie", name: "Ireland" },
    { code: "ca", name: "Canada" },
    { code: "au", name: "Australia" },
    { code: "vn", name: "Vietnam" },
    { code: "sg", name: "Singapore" },
    { code: "jp", name: "Japan" },
  ]);
  const [suggestedCountry, setSuggestedCountry] = useState("us");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form setup
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
  
  // Submit handler
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: Application) => {
      await apiRequest("POST", "/api/applications", data);
    },
    onSuccess: () => {
      form.reset();
      onSubmitSuccess();
    }
  });

  // File drop handlers
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'application/pdf' || 
          file.type === 'application/msword' || 
          file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        setFileData(file);
      }
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileData(e.target.files[0]);
    }
  };

  // Try to get user country
  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        if (data.country_code) {
          setSuggestedCountry(data.country_code.toLowerCase());
        }
      } catch (error) {
        console.error("Could not get country information:", error);
      }
    };
    
    fetchCountry();
  }, []);

  const onSubmit = (data: Application) => {
    if (reviewMode) {
      try {
        // Gửi email thông báo có ứng viên mới
        sendApplicationNotification({
          jobId: data.jobId,
          jobTitle: jobTitle,
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
          portfolioUrl: data.portfolioUrl,
          coverLetter: data.coverLetter
        }).catch(err => {
          console.error("Không thể gửi email thông báo, nhưng vẫn gửi đơn đăng ký:", err);
        });
      } catch (error) {
        console.error("Lỗi khi gửi email:", error);
      }
      
      // Gửi dữ liệu đến API (luôn được thực hiện, ngay cả khi email thất bại)
      mutate(data);
    } else {
      setReviewMode(true);
    }
  };

  const goToStep = (newStep: number) => {
    if (newStep === 1) {
      if (form.formState.errors.fullName || form.formState.errors.email || form.formState.errors.phone) {
        return;
      }
    }
    setStep(newStep);
  };

  const editForm = () => {
    setReviewMode(false);
  };

  return (
    <div>
      {!reviewMode ? (
        <>
          <div className="flex justify-between items-center mb-6">
            <h4 className="font-medium text-gray-700">Thông tin ứng viên</h4>
            <div className="text-sm text-gray-500">
              <span className={`font-medium ${step === 1 ? "text-whatsapp-green" : ""}`}>Bước 1</span> 
              <span className="mx-2">-</span> 
              <span className={`font-medium ${step === 2 ? "text-whatsapp-green" : ""}`}>Bước 2</span> 
              <span className="mx-2">-</span> 
              <span className={`font-medium ${step === 3 ? "text-whatsapp-green" : ""}`}>Bước 3</span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full h-2 bg-gray-200 rounded-full mb-6">
            <div 
              className="h-full bg-whatsapp-green rounded-full transition-all duration-300" 
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {step === 1 && (
                <div className="space-y-4 animate__animated animate__fadeIn">
                  <h5 className="font-medium text-gray-700 mb-2">Thông tin cá nhân</h5>
                  
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="block text-gray-700 text-sm font-medium mb-1">Họ và tên <span className="text-red-500">*</span></FormLabel>
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
                        <FormLabel className="block text-gray-700 text-sm font-medium mb-1">Email <span className="text-red-500">*</span></FormLabel>
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

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="block text-gray-700 text-sm font-medium mb-1">Số điện thoại <span className="text-red-500">*</span></FormLabel>
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
                    
                    <div>
                      <label className="block text-gray-700 text-sm font-medium mb-1">Quốc gia</label>
                      <Select defaultValue={suggestedCountry}>
                        <SelectTrigger className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-whatsapp-green">
                          <SelectValue placeholder="Chọn quốc gia" />
                        </SelectTrigger>
                        <SelectContent>
                          {countries.map((country) => (
                            <SelectItem key={country.code} value={country.code}>
                              {country.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

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
                  
                  <div className="flex justify-end">
                    <Button
                      type="button"
                      onClick={() => goToStep(2)}
                      className="bg-whatsapp-green text-white py-2 px-4 rounded-lg hover:bg-whatsapp-light transition flex items-center justify-center"
                    >
                      <span>Tiếp tục</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </Button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4 animate__animated animate__fadeIn">
                  <h5 className="font-medium text-gray-700 mb-2">Hồ sơ ứng tuyển</h5>
                  
                  <div 
                    className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-whatsapp-green transition-colors"
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input 
                      ref={fileInputRef}
                      type="file" 
                      accept=".pdf,.doc,.docx" 
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    
                    {fileData ? (
                      <div className="text-center">
                        <div className="bg-green-100 text-green-800 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <p className="font-medium text-gray-800">{fileData.name}</p>
                        <p className="text-sm text-gray-500 mt-1">{(fileData.size / 1024 / 1024).toFixed(2)} MB</p>
                        <button 
                          className="text-red-500 text-sm mt-2 hover:text-red-700"
                          onClick={(e) => {
                            e.stopPropagation();
                            setFileData(null);
                          }}
                        >
                          Xóa file
                        </button>
                      </div>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <p className="text-gray-600 mb-1">Kéo thả CV của bạn vào đây hoặc click để chọn file</p>
                        <p className="text-xs text-gray-500">Định dạng hỗ trợ: PDF, DOC, DOCX (tối đa 5MB)</p>
                      </>
                    )}
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="coverLetter"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="block text-gray-700 text-sm font-medium mb-1">Thư ngỏ <span className="text-red-500">*</span></FormLabel>
                        <FormControl>
                          <Textarea 
                            rows={4} 
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-whatsapp-green" 
                            placeholder="Hãy chia sẻ lý do bạn muốn làm việc tại WhatsApp và những kỹ năng nổi bật của bạn..."
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex justify-between">
                    <Button
                      type="button"
                      onClick={() => goToStep(1)}
                      className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition flex items-center justify-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                      </svg>
                      <span>Quay lại</span>
                    </Button>
                    
                    <Button
                      type="button"
                      onClick={() => goToStep(3)}
                      className="bg-whatsapp-green text-white py-2 px-4 rounded-lg hover:bg-whatsapp-light transition flex items-center justify-center"
                    >
                      <span>Tiếp tục</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </Button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4 animate__animated animate__fadeIn">
                  <h5 className="font-medium text-gray-700 mb-2">Xác nhận thông tin</h5>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Họ và tên:</p>
                        <p className="font-medium">{form.getValues("fullName")}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Email:</p>
                        <p className="font-medium">{form.getValues("email")}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Số điện thoại:</p>
                        <p className="font-medium">{form.getValues("phone")}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Portfolio/LinkedIn:</p>
                        <p className="font-medium">{form.getValues("portfolioUrl") || "Không có"}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-sm text-gray-600">CV:</p>
                      <p className="font-medium">{fileData ? fileData.name : "Chưa đính kèm"}</p>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-sm text-gray-600">Thư ngỏ:</p>
                      <p className="whitespace-pre-wrap">{form.getValues("coverLetter")}</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <Button
                      type="button"
                      onClick={() => goToStep(2)}
                      className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition flex items-center justify-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                      </svg>
                      <span>Quay lại</span>
                    </Button>
                    
                    <Button 
                      type="submit" 
                      className="bg-whatsapp-green text-white py-2 px-6 rounded-lg hover:bg-whatsapp-light transition flex items-center justify-center"
                    >
                      <span>Kiểm tra và gửi</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </Form>
        </>
      ) : (
        <div className="application-review space-y-6 animate__animated animate__fadeIn">
          <div className="text-center">
            <div className="bg-whatsapp-green text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <h4 className="text-xl font-bold text-gray-800 mb-2">Kiểm tra thông tin đơn ứng tuyển</h4>
            <p className="text-gray-600 mb-6">Vui lòng xác nhận rằng các thông tin bạn đã cung cấp là chính xác trước khi gửi.</p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-6 divide-y divide-gray-200">
            <div className="grid md:grid-cols-2 gap-4 pb-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Họ và tên</p>
                <p className="font-medium">{form.getValues("fullName")}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Email</p>
                <p className="font-medium">{form.getValues("email")}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Số điện thoại</p>
                <p className="font-medium">{form.getValues("phone")}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Portfolio/LinkedIn</p>
                <p className="font-medium">{form.getValues("portfolioUrl") || "Không có"}</p>
              </div>
            </div>
            
            <div className="py-4">
              <p className="text-sm text-gray-500 mb-1">CV đính kèm</p>
              {fileData ? (
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-whatsapp-green mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">{fileData.name}</span>
                </div>
              ) : (
                <p className="font-medium text-yellow-600">Chưa đính kèm CV</p>
              )}
            </div>
            
            <div className="pt-4">
              <p className="text-sm text-gray-500 mb-1">Thư ngỏ</p>
              <p className="whitespace-pre-wrap">{form.getValues("coverLetter")}</p>
            </div>
          </div>
          
          <div className="flex justify-between gap-4">
            <Button
              type="button"
              onClick={editForm}
              className="w-1/2 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition"
            >
              Chỉnh sửa
            </Button>
            
            <Button 
              onClick={() => mutate(form.getValues())}
              disabled={isPending}
              className="w-1/2 bg-whatsapp-green text-white py-2 rounded-lg hover:bg-whatsapp-light transition flex items-center justify-center"
            >
              <span>{isPending ? "Đang gửi..." : "Xác nhận và gửi"}</span>
              {!isPending && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
