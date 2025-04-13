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
    location: "Austin, Texas, USA",
    description: [
      "Develop and implement digital marketing strategies for WhatsApp Business",
      "Manage advertising campaigns across digital platforms",
      "Analyze data and report on marketing performance",
      "Optimize user experience on the WhatsApp Business platform"
    ],
    requirements: [
      "Minimum 3 years experience in digital marketing",
      "Deep knowledge of SEO, SEM, and data analytics",
      "Strong project management and teamwork skills",
      "Professional English communication skills"
    ],
    benefits: [
      "Salary: $8,000 - $12,000/month (based on experience)",
      "Quarterly performance bonuses",
      "Premium health insurance",
      "Flexible vacation policy"
    ]
  },
  {
    id: 2,
    title: "Content Marketing Specialist",
    location: "Seattle, Washington, USA",
    description: [
      "Develop and produce content for WhatsApp's blog and social media",
      "Build content plans aligned with marketing strategy",
      "Optimize content for SEO and increase traffic",
      "Monitor content performance and suggest improvements"
    ],
    requirements: [
      "2+ years experience in content marketing",
      "Ability to write engaging marketing content",
      "Understanding of SEO and digital content trends",
      "Strong time management and organizational skills"
    ],
    benefits: [
      "Salary: $5,000 - $7,500/month (based on experience)",
      "Project and achievement bonuses",
      "Comprehensive health insurance",
      "International work environment"
    ]
  },
  {
    id: 3,
    title: "Social Media Marketing Lead",
    location: "New York City, New York, USA",
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
