import { z } from "zod"

export const SoftwareLicenseType = z.enum(["PER_DEVICE", "PER_USER", "CUSTOM"])

export const SoftwareLicenseRenewalUnit = z.enum(["MONTH", "YEAR"])

export const SoftwareLicenseAssignmentType = z.enum([
  "NORMALIZED_SOFTWARE",
  "SOFTWARE_INVENTORY",
  "DEVICE_SEARCH_GROUPS",
  "USER_CONTACT"
])

export const SoftwareLicenseCostMode = z.enum(["TOTAL", "PER_LICENSE"])

export const SoftwareLicenseUsageMonitoringBinaryOSType = z.enum(["WINDOWS", "LINUX", "MAC"])

/** The Software License to be created */
export const CreateSoftwareLicense = z.object({
  /** Indicates the name of the software license */
  name: z.string(),
  /** Indicates a description for the software license */
  description: z.string().min(0).max(250),
  /**
   * Indicates the type of the software license
   * @example "PER_DEVICE"
   */
  type: SoftwareLicenseType,
  /**
   * Indicates the purchase date of the software license in unix epoch milliseconds
   * @example 1672531199000
   */
  purchaseDate: z.int64(),
  /** Identifier of the publisher */
  publisherId: z.int32(),
  /** Identifier of the vendor */
  vendorId: z.int32(),
  /** Indicates the scope of the software license */
  scope: z.object({
    global: z.boolean(),
    organizationIds: z.int32().array(),
    locationIds: z.int32().array()
  }),
  /** Indicates the quantity of the software license */
  quantity: z.int32(),
  /** Indicates the current usage of the software license */
  currentUsage: z.int32(),
  /** Indicates the term of the software license */
  term: z.object({
    renewalUnit: SoftwareLicenseRenewalUnit,
    value: z.int32(),
    expirationDate: z.number(),
    autoRenewal: z.boolean(),
    generateActivityAlert: z.boolean(),
    daysBeforeExpiration: z.int32(),
    hasNotifiedExpirationDate: z.boolean(),
    hasNotifiedUpToRenewal: z.boolean()
  }),
  notificationChannelInfo: z.object({
    email: z.string(),
    sms: z.string(),
    pushNotification: z.string()
  }),
  assignmentAutomationSettings: z.object({
    assignmentType: SoftwareLicenseAssignmentType,
    type: z.string()
  }),
  /** Indicates the ids of the assigned licenses */
  assignedLicenses: z.object(),
  /** Indicates the ids of the unassigned licenses */
  unassignedLicenses: z.object(),
  /** Indicates a note about the software license */
  note: z.string(),
  /** Indicates the cost mode of the software license */
  costMode: SoftwareLicenseCostMode,
  /** Indicates the cost of the software license */
  cost: z.number(),
  /** Indicates the binary usage monitoring configuration for the software license */
  usageMonitoring: z
    .object({
      /** List of the OS-specific binary configurations for usage monitoring */
      binaries: z
        .object({
          /**
           * Operating system type
           * @example "WINDOWS"
           */
          osType: SoftwareLicenseUsageMonitoringBinaryOSType,
          /**
           * List of binary/process names to monitor
           * @example ["chrome.exe", "firefox.exe"]
           */
          binaryNames: z.string().array(),
          /** Flag indicating whether configured binaries don't match detected binaries */
          nonMatches: z.boolean()
        })
        .array()
    })
    .nullable()
})
