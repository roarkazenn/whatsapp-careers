import { 
  users, type User, type InsertUser,
  jobs, type Job, type InsertJob,
  applications, type Application,
  contacts, type ContactMessage,
  defaultJobs
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Job operations
  getJobs(): Promise<Job[]>;
  getJob(id: number): Promise<Job | undefined>;
  
  // Application operations
  createApplication(application: Application & { createdAt: string }): Promise<{ id: number }>;
  
  // Contact form operations
  createContactMessage(message: ContactMessage & { createdAt: string }): Promise<{ id: number }>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private jobsMap: Map<number, Job>;
  private applications: Map<number, Application & { id: number, createdAt: string }>;
  private contacts: Map<number, ContactMessage & { id: number, createdAt: string }>;
  
  private userIdCounter: number;
  private applicationIdCounter: number;
  private contactIdCounter: number;

  constructor() {
    this.users = new Map();
    this.jobsMap = new Map();
    this.applications = new Map();
    this.contacts = new Map();
    
    this.userIdCounter = 1;
    this.applicationIdCounter = 1;
    this.contactIdCounter = 1;
    
    // Initialize with default jobs
    defaultJobs.forEach(job => {
      this.jobsMap.set(job.id, job);
    });
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Job operations
  async getJobs(): Promise<Job[]> {
    return Array.from(this.jobsMap.values());
  }
  
  async getJob(id: number): Promise<Job | undefined> {
    return this.jobsMap.get(id);
  }
  
  // Application operations
  async createApplication(application: Application & { createdAt: string }): Promise<{ id: number }> {
    const id = this.applicationIdCounter++;
    const newApplication = { ...application, id };
    this.applications.set(id, newApplication);
    return { id };
  }
  
  // Contact form operations
  async createContactMessage(message: ContactMessage & { createdAt: string }): Promise<{ id: number }> {
    const id = this.contactIdCounter++;
    const newMessage = { ...message, id };
    this.contacts.set(id, newMessage);
    return { id };
  }
}

export const storage = new MemStorage();
