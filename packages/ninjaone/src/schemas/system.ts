import { z } from "zod"
import {
  ApprovalStatus,
  ChassisType,
  InvitationStatus,
  JobOrigin,
  JobResult,
  JobStatus,
  JobType,
  MaintenanceModeStatus,
  NodeApprovalMode,
  NodeClass,
  UserType
} from "./enums"

export const Contact = z.object({
  id: z.int32(),
  organizationId: z.int32(),
  uid: z.uuid(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  phone: z.string(),
  jobTitle: z.string()
})

export const Organization = z.object({
  /** Organization full name */
  name: z.string(),
  /** Organization Description */
  description: z.string(),
  /** Custom attributes */
  userData: z.object(),
  /** Device Approval Mode */
  nodeApprovalMode: NodeApprovalMode,
  /** Organization identifier */
  id: z.int32()
})

export const Policy = z.object({
  /** Policy identifier */
  id: z.int32(),
  /** Parent Policy identifier */
  parentPolicyId: z.int32(),
  /** Name */
  name: z.string(),
  /** Description */
  description: z.string(),
  /** Node Class */
  nodeClass: NodeClass,
  /** Last update timestamp */
  updated: z.number(),
  /** Is Default Policy for Node Class */
  nodeClassDefault: z.boolean()
})

export const JobDevice = z.object({
  id: z.int32(),
  uid: z.uuid(),
  assignedOwnerUid: z.uuid(),
  parentDeviceId: z.int32(),
  organizationId: z.int32(),
  locationId: z.int32(),
  nodeClass: NodeClass,
  nodeRoleId: z.int32(),
  rolePolicyId: z.int32(),
  policyId: z.int32(),
  approvalStatus: ApprovalStatus,
  offline: z.boolean(),
  displayName: z.string(),
  systemName: z.string(),
  dnsName: z.string(),
  netbiosName: z.string(),
  created: z.number(),
  lastContact: z.number(),
  lastUpdate: z.number(),
  userData: z.object(),
  tags: z.string().array(),
  maintenance: z.object({
    status: MaintenanceModeStatus,
    start: z.number(),
    end: z.number(),
    reasonMessage: z.string()
  }),
  references: z.object({
    organization: Organization,
    location: z.object({
      name: z.string(),
      address: z.string(),
      description: z.string(),
      userData: z.object(),
      id: z.int32()
    }),
    rolePolicy: Policy,
    policy: Policy,
    role: z.object({
      id: z.int32(),
      name: z.string(),
      description: z.string(),
      nodeClass: NodeClass,
      custom: z.boolean(),
      chassisType: ChassisType,
      created: z.number(),
      nodeRoleParentId: z.int32(),
      icon: z.string()
    }),
    backupUsage: z.object({
      revisionsCurrentSize: z.int64(),
      revisionsPreviousSize: z.int64(),
      revisionsDeletedSize: z.int64(),
      localFileFolderSize: z.int64(),
      localImageSize: z.int64(),
      localImageV2Size: z.int64(),
      cloudFileFolderSize: z.int64(),
      cloudImageSize: z.int64(),
      cloudImageV2Size: z.int64(),
      cloudNetworkShareSize: z.int64(),
      lastSuccessfulBackupJob: z.number(),
      lastFailedBackupJob: z.number(),
      revisionsTotalSize: z.int64(),
      cloudTotalSize: z.int64(),
      localTotalSize: z.int64()
    }),
    warranty: z.object({
      startDate: z.number(),
      endDate: z.number(),
      manufacturerFulfillmentDate: z.number()
    }),
    assignedOwner: z.object({
      id: z.int32(),
      uid: z.uuid(),
      firstName: z.string(),
      lastName: z.string(),
      email: z.string(),
      phone: z.string(),
      enabled: z.boolean(),
      administrator: z.boolean(),
      permitAllClients: z.boolean(),
      notifyAllClients: z.boolean(),
      mustChangePw: z.boolean(),
      mfaConfigured: z.boolean(),
      userType: UserType,
      invitationStatus: InvitationStatus,
      organizationId: z.int32(),
      deviceIds: z.int32().array(),
      assignedDeviceIds: z.int32().array(),
      roles: z.string().array()
    }),
    backupBandwidthThrottle: z.object({
      enabled: z.boolean(),
      workHoursKbps: z.int32(),
      nonWorkHoursKbps: z.int32(),
      workHoursUserUnit: z.string(),
      nonWorkHoursUserUnit: z.string(),
      workSchedule: z.object({
        endHour: z.int32(),
        endMinute: z.int32(),
        startHour: z.int32(),
        startMinute: z.int32(),
        weekDays: z.string().array()
      })
    })
  })
})

export const Job = z.object({
  /** Task/Job UID (activity series UID) */
  uid: z.uuid(),
  /** Device identifier */
  deviceId: z.int32(),
  /** Job message */
  message: z.string(),
  /** Job start timestamp */
  createTime: z.number(),
  /** Job last updated */
  updateTime: z.number(),
  /** Job origin */
  sourceType: JobOrigin,
  /** Source configuratino/policy element reference */
  sourceConfigUid: z.uuid(),
  /** Source configuration/policy element name */
  sourceName: z.string(),
  /** Job subject */
  subject: z.string(),
  /** User identifier */
  userId: z.int32(),
  /** Related PSA ticket ID */
  psaTicketId: z.object(),
  /** PSA ticket template */
  ticketTemplateId: z.int32(),
  /** Job data */
  data: z.object(),
  /** Device information. */
  device: JobDevice,
  /** Job Status */
  jobStatus: JobStatus,
  /** Job result */
  jobResult: JobResult,
  /** Job Type */
  jobType: JobType
})
