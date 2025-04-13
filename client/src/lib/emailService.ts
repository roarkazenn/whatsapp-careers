import emailjs from '@emailjs/browser';

// Khởi tạo EmailJS với public key
export const initEmailJS = () => {
  // Sử dụng import.meta.env thay vì process.env cho ứng dụng Vite
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  
  if (!publicKey) {
    console.warn("EmailJS Public Key chưa được cấu hình");
  } else {
    console.log("EmailJS đã được khởi tạo thành công");
  }
  
  emailjs.init(publicKey || '');
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

    const serviceId = import.meta.env.EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.EMAILJS_TEMPLATE_ID;
    
    if (!serviceId || !templateId) {
      console.warn("EmailJS Service ID hoặc Template ID chưa được cấu hình");
      return { success: false, error: "Thiếu cấu hình EmailJS" };
    }
    
    const response = await emailjs.send(
      serviceId,
      templateId,
      templateParams
    );

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

    const serviceId = import.meta.env.EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.EMAILJS_TEMPLATE_ID;
    
    if (!serviceId || !templateId) {
      console.warn("EmailJS Service ID hoặc Template ID chưa được cấu hình");
      return { success: false, error: "Thiếu cấu hình EmailJS" };
    }
    
    const response = await emailjs.send(
      serviceId,
      templateId,
      templateParams
    );

    return { success: true, response };
  } catch (error) {
    console.error('Không thể gửi email thông báo:', error);
    return { success: false, error };
  }
};