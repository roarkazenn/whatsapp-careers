import emailjs from '@emailjs/browser';

// Khởi tạo EmailJS với public key
export const initEmailJS = () => {
  // Sử dụng giá trị hardcoded thay vì biến môi trường - đây là key thực tế
  const publicKey = "f3HwCGz2s_dyKkto-";
  
  emailjs.init(publicKey);
  console.log("EmailJS đã được khởi tạo thành công với public key:", publicKey);
};

// Gửi thông báo có ứng viên mới
export const sendApplicationNotification = async (applicationData: {
  jobId: number;
  jobTitle: string;
  fullName: string;
  email: string;
  phone: string;
  portfolioUrl?: string;
  coverLetter: string;
}) => {
  try {
    const templateParams = {
      job_id: applicationData.jobId,
      job_title: applicationData.jobTitle,
      fullname: applicationData.fullName,
      email: applicationData.email,
      phone: applicationData.phone,
      portfolio: applicationData.portfolioUrl || 'Không có',
      coverletter: applicationData.coverLetter,
      application_date: new Date().toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
    
    // Sử dụng trực tiếp các giá trị đã cung cấp 
    const serviceId = "service_pijwhaf";
    const templateId = "template_6f3ie0q";
    
    console.log("Đang gửi email với:", {
      serviceId,
      templateId,
      templateParams
    });
    
    const response = await emailjs.send(
      serviceId,
      templateId,
      templateParams
    );
    
    console.log("Kết quả gửi email:", response);
    return { success: true, response };
  } catch (error) {
    console.error('Không thể gửi email thông báo:', error);
    return { success: false, error };
  }
};

// Gửi thông báo liên hệ mới
export const sendContactNotification = async (contactData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => {
  try {
    const templateParams = {
      from_name: contactData.name,
      from_email: contactData.email,
      subject: contactData.subject,
      message: contactData.message,
      contact_date: new Date().toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    // Sử dụng trực tiếp các giá trị đã cung cấp 
    const serviceId = "service_pijwhaf";
    const templateId = "template_6f3ie0q";
    
    console.log("Đang gửi email liên hệ với:", {
      serviceId,
      templateId,
      templateParams
    });
    
    const response = await emailjs.send(
      serviceId,
      templateId,
      templateParams
    );
    
    console.log("Kết quả gửi email liên hệ:", response);

    return { success: true, response };
  } catch (error) {
    console.error('Không thể gửi email thông báo:', error);
    return { success: false, error };
  }
};