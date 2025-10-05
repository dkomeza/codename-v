import type { Request, Response } from "express";
import { OrgService } from "../services/org.service";

const orgService = new OrgService();

export class OrgController {
  async create(req: Request, res: Response) {
    try {
      const { organizationName } = req.body;

      if (!organizationName || typeof organizationName !== "string") {
        return res.status(400).json({
          error: "organizationName is required and must be a string",
        });
      }

      const organization = await orgService.createOrganization(organizationName);
      return res.status(201).json(organization);
    } catch (error) {
      console.error("Error creating organization:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const organization = await orgService.getOrganizationById(id);

      if (!organization) {
        return res.status(404).json({ error: "Organization not found" });
      }

      return res.status(200).json(organization);
    } catch (error) {
      console.error("Error fetching organization:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const organizations = await orgService.getAllOrganizations();
      return res.status(200).json(organizations);
    } catch (error) {
      console.error("Error fetching organizations:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { organizationName } = req.body;

      if (!organizationName || typeof organizationName !== "string") {
        return res.status(400).json({
          error: "organizationName is required and must be a string",
        });
      }

      const organization = await orgService.updateOrganization(id, organizationName);
      return res.status(200).json(organization);
    } catch (error: any) {
      console.error("Error updating organization:", error);
      if (error.code === "P2025") {
        return res.status(404).json({ error: "Organization not found" });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await orgService.deleteOrganization(id);
      return res.status(204).send();
    } catch (error: any) {
      console.error("Error deleting organization:", error);
      if (error.message === "Organization not found") {
        return res.status(404).json({ error: error.message });
      }
      if (error.message.includes("Cannot delete organization with existing")) {
        return res.status(409).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getUsers(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const users = await orgService.getOrganizationUsers(id);
      return res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching organization users:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getEvents(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const events = await orgService.getOrganizationEvents(id);
      return res.status(200).json(events);
    } catch (error) {
      console.error("Error fetching organization events:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getApplications(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const applications = await orgService.getOrganizationApplications(id);
      return res.status(200).json(applications);
    } catch (error) {
      console.error("Error fetching organization applications:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}
