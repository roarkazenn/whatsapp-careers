import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users Schema (from existing file)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Jobs Schema
export const jobs = pgTable("jobs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  location: text("location").notNull(),
  description: text("description").array().notNull(),
  requirements: text("requirements").array().notNull(),
  benefits: text("benefits").array().notNull(),
});

export const insertJobSchema = createInsertSchema(jobs);
export type InsertJob = z.infer<typeof insertJobSchema>;
export type Job = typeof jobs.$inferSelect;

// Applications Schema
export const applications = pgTable("applications", {
  id: serial("id").primaryKey(),
  jobId: integer("job_id").notNull(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  portfolioUrl: text("portfolio_url"),
  coverLetter: text("cover_letter"),
  createdAt: text("created_at").notNull(),
});

export const applicationFormSchema = z.object({
  jobId: z.number(),
  fullName: z.string().min(2, "Vui lòng nhập họ và tên"),
  email: z.string().email("Email không hợp lệ"),
  phone: z.string().min(9, "Số điện thoại không hợp lệ"),
  portfolioUrl: z.string().url().optional().or(z.literal("")),
  coverLetter: z.string().min(10, "Vui lòng nhập thông tin chi tiết").max(1000, "Tối đa 1000 ký tự"),
});

export type Application = z.infer<typeof applicationFormSchema>;

// Contact Form Schema
export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: text("created_at").notNull(),
});

export const contactFormSchema = z.object({
  name: z.string().min(2, "Vui lòng nhập họ và tên"),
  email: z.string().email("Email không hợp lệ"),
  subject: z.string().min(1, "Vui lòng chọn chủ đề"),
  message: z.string().min(10, "Vui lòng nhập tin nhắn").max(1000, "Tối đa 1000 ký tự"),
});

export type ContactMessage = z.infer<typeof contactFormSchema>;

// Default job data
export const defaultJobs: Job[] = [
  {
    id: 1,
    title: "Digital Marketing Manager",
    location: "Menlo Park, California, USA",
    description: [
      "Phát triển và thực hiện chiến lược marketing số cho WhatsApp Business",
      "Quản lý các chiến dịch quảng cáo trên các nền tảng số",
      "Phân tích dữ liệu và báo cáo hiệu suất marketing",
      "Tối ưu hóa trải nghiệm người dùng trên nền tảng WhatsApp Business"
    ],
    requirements: [
      "Tối thiểu 3 năm kinh nghiệm trong marketing số",
      "Kiến thức sâu về SEO, SEM, và phân tích dữ liệu",
      "Kỹ năng quản lý dự án và làm việc nhóm tốt",
      "Tiếng Anh thông thạo (IELTS 6.5 trở lên)"
    ],
    benefits: [
      "Mức lương: $8,000 - $12,000/tháng (tùy năng lực)",
      "Thưởng hiệu suất hàng quý",
      "Bảo hiểm sức khỏe cao cấp",
      "Chính sách nghỉ phép linh hoạt"
    ]
  },
  {
    id: 2,
    title: "Content Marketing Specialist",
    location: "London, United Kingdom",
    description: [
      "Phát triển và sản xuất nội dung cho blog và mạng xã hội của WhatsApp",
      "Xây dựng kế hoạch nội dung phù hợp với chiến lược marketing",
      "Tối ưu hóa nội dung cho SEO và tăng lưu lượng truy cập",
      "Theo dõi hiệu suất nội dung và đề xuất cải tiến"
    ],
    requirements: [
      "2+ năm kinh nghiệm trong lĩnh vực marketing nội dung",
      "Khả năng viết nội dung marketing hấp dẫn",
      "Hiểu biết về SEO và các xu hướng nội dung số",
      "Kỹ năng quản lý thời gian và tổ chức tốt"
    ],
    benefits: [
      "Mức lương: $5,000 - $7,500/tháng (tùy năng lực)",
      "Thưởng dự án và thành tích",
      "Chế độ bảo hiểm sức khỏe toàn diện",
      "Môi trường làm việc quốc tế"
    ]
  },
  {
    id: 3,
    title: "Social Media Marketing Lead",
    location: "Dublin, Ireland",
    description: [
      "Phát triển và thực hiện chiến lược truyền thông xã hội của WhatsApp",
      "Quản lý nhóm social media và lên kế hoạch nội dung hàng tháng",
      "Phân tích dữ liệu và tối ưu hóa chiến dịch social media",
      "Hợp tác với các bộ phận khác để đảm bảo thông điệp nhất quán"
    ],
    requirements: [
      "4+ năm kinh nghiệm trong quản lý social media",
      "Kinh nghiệm lãnh đạo nhóm marketing",
      "Hiểu biết sâu về các nền tảng xã hội và xu hướng mới",
      "Kỹ năng phân tích dữ liệu mạnh mẽ"
    ],
    benefits: [
      "Mức lương: $7,000 - $10,000/tháng (tùy năng lực)",
      "Thưởng hiệu suất hàng quý",
      "Bảo hiểm sức khỏe toàn diện",
      "Cơ hội đào tạo và phát triển quốc tế"
    ]
  }
];
