import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { getLocationData } from "./location-service";
import { applicationFormSchema, contactFormSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all jobs
  app.get("/api/jobs", async (req, res) => {
    try {
      const jobs = await storage.getJobs();
      res.json(jobs);
    } catch (error) {
      res.status(500).json({ message: "Error fetching jobs" });
    }
  });

  // Get job by id
  app.get("/api/jobs/:id", async (req, res) => {
    try {
      const jobId = parseInt(req.params.id);
      const job = await storage.getJob(jobId);
      
      if (!job) {
        return res.status(404).json({ message: "Job not found" });
      }
      
      res.json(job);
    } catch (error) {
      res.status(500).json({ message: "Error fetching job" });
    }
  });

  // Submit application
  app.post("/api/applications", async (req, res) => {
    try {
      const application = applicationFormSchema.parse(req.body);
      
      const result = await storage.createApplication({
        ...application,
        createdAt: new Date().toISOString()
      });
      
      res.status(201).json({ message: "Application submitted successfully", id: result.id });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      res.status(500).json({ message: "Error submitting application" });
    }
  });

  // Submit contact form
  app.post("/api/contact", async (req, res) => {
    try {
      const contactMessage = contactFormSchema.parse(req.body);
      
      const result = await storage.createContactMessage({
        ...contactMessage,
        createdAt: new Date().toISOString()
      });
      
      res.status(201).json({ message: "Message sent successfully", id: result.id });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      res.status(500).json({ message: "Error sending message" });
    }
  });

  // Get user location data
  app.get("/api/location", async (req, res) => {
    try {
      const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
      const locationData = await getLocationData(ip.toString());
      res.json(locationData);
    } catch (error) {
      res.status(500).json({ message: "Error fetching location data" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
