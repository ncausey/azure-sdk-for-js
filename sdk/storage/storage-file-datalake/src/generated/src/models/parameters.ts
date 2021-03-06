/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

import * as coreHttp from "@azure/core-http";

export const acl: coreHttp.OperationParameter = {
  parameterPath: [
    "options",
    "acl"
  ],
  mapper: {
    serializedName: "x-ms-acl",
    type: {
      name: "String"
    }
  }
};
export const action0: coreHttp.OperationQueryParameter = {
  parameterPath: "action",
  mapper: {
    required: true,
    serializedName: "action",
    type: {
      name: "Enum",
      allowedValues: [
        "append",
        "flush",
        "setProperties",
        "setAccessControl",
        "setAccessControlRecursive"
      ]
    }
  }
};
export const action1: coreHttp.OperationQueryParameter = {
  parameterPath: [
    "options",
    "action"
  ],
  mapper: {
    serializedName: "action",
    type: {
      name: "Enum",
      allowedValues: [
        "getAccessControl",
        "getStatus"
      ]
    }
  }
};
export const action2: coreHttp.OperationQueryParameter = {
  parameterPath: "action",
  mapper: {
    required: true,
    isConstant: true,
    serializedName: "action",
    defaultValue: 'setAccessControl',
    type: {
      name: "String"
    }
  }
};
export const action3: coreHttp.OperationQueryParameter = {
  parameterPath: "action",
  mapper: {
    required: true,
    isConstant: true,
    serializedName: "action",
    defaultValue: 'setAccessControlRecursive',
    type: {
      name: "String"
    }
  }
};
export const action4: coreHttp.OperationQueryParameter = {
  parameterPath: "action",
  mapper: {
    required: true,
    isConstant: true,
    serializedName: "action",
    defaultValue: 'flush',
    type: {
      name: "String"
    }
  }
};
export const action5: coreHttp.OperationQueryParameter = {
  parameterPath: "action",
  mapper: {
    required: true,
    isConstant: true,
    serializedName: "action",
    defaultValue: 'append',
    type: {
      name: "String"
    }
  }
};
export const cacheControl: coreHttp.OperationParameter = {
  parameterPath: [
    "options",
    "pathHttpHeaders",
    "cacheControl"
  ],
  mapper: {
    serializedName: "x-ms-cache-control",
    type: {
      name: "String"
    }
  }
};
export const close: coreHttp.OperationQueryParameter = {
  parameterPath: [
    "options",
    "close"
  ],
  mapper: {
    serializedName: "close",
    type: {
      name: "Boolean"
    }
  }
};
export const comp: coreHttp.OperationQueryParameter = {
  parameterPath: "comp",
  mapper: {
    required: true,
    isConstant: true,
    serializedName: "comp",
    defaultValue: 'expiry',
    type: {
      name: "String"
    }
  }
};
export const contentDisposition: coreHttp.OperationParameter = {
  parameterPath: [
    "options",
    "pathHttpHeaders",
    "contentDisposition"
  ],
  mapper: {
    serializedName: "x-ms-content-disposition",
    type: {
      name: "String"
    }
  }
};
export const contentEncoding: coreHttp.OperationParameter = {
  parameterPath: [
    "options",
    "pathHttpHeaders",
    "contentEncoding"
  ],
  mapper: {
    serializedName: "x-ms-content-encoding",
    type: {
      name: "String"
    }
  }
};
export const contentLanguage: coreHttp.OperationParameter = {
  parameterPath: [
    "options",
    "pathHttpHeaders",
    "contentLanguage"
  ],
  mapper: {
    serializedName: "x-ms-content-language",
    type: {
      name: "String"
    }
  }
};
export const contentLength: coreHttp.OperationParameter = {
  parameterPath: [
    "options",
    "contentLength"
  ],
  mapper: {
    serializedName: "Content-Length",
    constraints: {
      InclusiveMinimum: 0
    },
    type: {
      name: "Number"
    }
  }
};
export const contentMD5: coreHttp.OperationParameter = {
  parameterPath: [
    "options",
    "pathHttpHeaders",
    "contentMD5"
  ],
  mapper: {
    serializedName: "x-ms-content-md5",
    type: {
      name: "ByteArray"
    }
  }
};
export const contentType: coreHttp.OperationParameter = {
  parameterPath: [
    "options",
    "pathHttpHeaders",
    "contentType"
  ],
  mapper: {
    serializedName: "x-ms-content-type",
    type: {
      name: "String"
    }
  }
};
export const continuation: coreHttp.OperationQueryParameter = {
  parameterPath: [
    "options",
    "continuation"
  ],
  mapper: {
    serializedName: "continuation",
    type: {
      name: "String"
    }
  }
};
export const expiresOn: coreHttp.OperationParameter = {
  parameterPath: [
    "options",
    "expiresOn"
  ],
  mapper: {
    serializedName: "x-ms-expiry-time",
    type: {
      name: "String"
    }
  }
};
export const expiryOptions: coreHttp.OperationParameter = {
  parameterPath: "expiryOptions",
  mapper: {
    required: true,
    serializedName: "x-ms-expiry-option",
    type: {
      name: "String"
    }
  }
};
export const group: coreHttp.OperationParameter = {
  parameterPath: [
    "options",
    "group"
  ],
  mapper: {
    serializedName: "x-ms-group",
    type: {
      name: "String"
    }
  }
};
export const ifMatch: coreHttp.OperationParameter = {
  parameterPath: [
    "options",
    "modifiedAccessConditions",
    "ifMatch"
  ],
  mapper: {
    serializedName: "If-Match",
    type: {
      name: "String"
    }
  }
};
export const ifModifiedSince: coreHttp.OperationParameter = {
  parameterPath: [
    "options",
    "modifiedAccessConditions",
    "ifModifiedSince"
  ],
  mapper: {
    serializedName: "If-Modified-Since",
    type: {
      name: "DateTimeRfc1123"
    }
  }
};
export const ifNoneMatch: coreHttp.OperationParameter = {
  parameterPath: [
    "options",
    "modifiedAccessConditions",
    "ifNoneMatch"
  ],
  mapper: {
    serializedName: "If-None-Match",
    type: {
      name: "String"
    }
  }
};
export const ifUnmodifiedSince: coreHttp.OperationParameter = {
  parameterPath: [
    "options",
    "modifiedAccessConditions",
    "ifUnmodifiedSince"
  ],
  mapper: {
    serializedName: "If-Unmodified-Since",
    type: {
      name: "DateTimeRfc1123"
    }
  }
};
export const leaseId: coreHttp.OperationParameter = {
  parameterPath: [
    "options",
    "leaseAccessConditions",
    "leaseId"
  ],
  mapper: {
    serializedName: "x-ms-lease-id",
    type: {
      name: "String"
    }
  }
};
export const maxRecords: coreHttp.OperationQueryParameter = {
  parameterPath: [
    "options",
    "maxRecords"
  ],
  mapper: {
    serializedName: "maxRecords",
    constraints: {
      InclusiveMinimum: 1
    },
    type: {
      name: "Number"
    }
  }
};
export const maxResults: coreHttp.OperationQueryParameter = {
  parameterPath: [
    "options",
    "maxResults"
  ],
  mapper: {
    serializedName: "maxResults",
    constraints: {
      InclusiveMinimum: 1
    },
    type: {
      name: "Number"
    }
  }
};
export const mode0: coreHttp.OperationQueryParameter = {
  parameterPath: [
    "options",
    "mode"
  ],
  mapper: {
    serializedName: "mode",
    type: {
      name: "Enum",
      allowedValues: [
        "legacy",
        "posix"
      ]
    }
  }
};
export const mode1: coreHttp.OperationQueryParameter = {
  parameterPath: "mode",
  mapper: {
    required: true,
    serializedName: "mode",
    type: {
      name: "Enum",
      allowedValues: [
        "set",
        "modify",
        "remove"
      ]
    }
  }
};
export const owner: coreHttp.OperationParameter = {
  parameterPath: [
    "options",
    "owner"
  ],
  mapper: {
    serializedName: "x-ms-owner",
    type: {
      name: "String"
    }
  }
};
export const path: coreHttp.OperationQueryParameter = {
  parameterPath: [
    "options",
    "path"
  ],
  mapper: {
    serializedName: "directory",
    type: {
      name: "String"
    }
  }
};
export const permissions: coreHttp.OperationParameter = {
  parameterPath: [
    "options",
    "permissions"
  ],
  mapper: {
    serializedName: "x-ms-permissions",
    type: {
      name: "String"
    }
  }
};
export const position: coreHttp.OperationQueryParameter = {
  parameterPath: [
    "options",
    "position"
  ],
  mapper: {
    serializedName: "position",
    type: {
      name: "Number"
    }
  }
};
export const prefix: coreHttp.OperationQueryParameter = {
  parameterPath: [
    "options",
    "prefix"
  ],
  mapper: {
    serializedName: "prefix",
    type: {
      name: "String"
    }
  }
};
export const properties: coreHttp.OperationParameter = {
  parameterPath: [
    "options",
    "properties"
  ],
  mapper: {
    serializedName: "x-ms-properties",
    type: {
      name: "String"
    }
  }
};
export const proposedLeaseId: coreHttp.OperationParameter = {
  parameterPath: [
    "options",
    "proposedLeaseId"
  ],
  mapper: {
    serializedName: "x-ms-proposed-lease-id",
    type: {
      name: "String"
    }
  }
};
export const range: coreHttp.OperationParameter = {
  parameterPath: [
    "options",
    "range"
  ],
  mapper: {
    serializedName: "Range",
    type: {
      name: "String"
    }
  }
};
export const recursive0: coreHttp.OperationQueryParameter = {
  parameterPath: "recursive",
  mapper: {
    required: true,
    serializedName: "recursive",
    type: {
      name: "Boolean"
    }
  }
};
export const recursive1: coreHttp.OperationQueryParameter = {
  parameterPath: [
    "options",
    "recursive"
  ],
  mapper: {
    serializedName: "recursive",
    type: {
      name: "Boolean"
    }
  }
};
export const renameSource: coreHttp.OperationParameter = {
  parameterPath: [
    "options",
    "renameSource"
  ],
  mapper: {
    serializedName: "x-ms-rename-source",
    type: {
      name: "String"
    }
  }
};
export const requestId: coreHttp.OperationParameter = {
  parameterPath: [
    "options",
    "requestId"
  ],
  mapper: {
    serializedName: "x-ms-client-request-id",
    type: {
      name: "String"
    }
  }
};
export const resource0: coreHttp.OperationQueryParameter = {
  parameterPath: "resource",
  mapper: {
    required: true,
    isConstant: true,
    serializedName: "resource",
    defaultValue: 'account',
    type: {
      name: "String"
    }
  }
};
export const resource1: coreHttp.OperationQueryParameter = {
  parameterPath: "resource",
  mapper: {
    required: true,
    isConstant: true,
    serializedName: "resource",
    defaultValue: 'filesystem',
    type: {
      name: "String"
    }
  }
};
export const resource2: coreHttp.OperationQueryParameter = {
  parameterPath: [
    "options",
    "resource"
  ],
  mapper: {
    serializedName: "resource",
    type: {
      name: "Enum",
      allowedValues: [
        "directory",
        "file"
      ]
    }
  }
};
export const retainUncommittedData: coreHttp.OperationQueryParameter = {
  parameterPath: [
    "options",
    "retainUncommittedData"
  ],
  mapper: {
    serializedName: "retainUncommittedData",
    type: {
      name: "Boolean"
    }
  }
};
export const sourceIfMatch: coreHttp.OperationParameter = {
  parameterPath: [
    "options",
    "sourceModifiedAccessConditions",
    "sourceIfMatch"
  ],
  mapper: {
    serializedName: "x-ms-source-if-match",
    type: {
      name: "String"
    }
  }
};
export const sourceIfModifiedSince: coreHttp.OperationParameter = {
  parameterPath: [
    "options",
    "sourceModifiedAccessConditions",
    "sourceIfModifiedSince"
  ],
  mapper: {
    serializedName: "x-ms-source-if-modified-since",
    type: {
      name: "DateTimeRfc1123"
    }
  }
};
export const sourceIfNoneMatch: coreHttp.OperationParameter = {
  parameterPath: [
    "options",
    "sourceModifiedAccessConditions",
    "sourceIfNoneMatch"
  ],
  mapper: {
    serializedName: "x-ms-source-if-none-match",
    type: {
      name: "String"
    }
  }
};
export const sourceIfUnmodifiedSince: coreHttp.OperationParameter = {
  parameterPath: [
    "options",
    "sourceModifiedAccessConditions",
    "sourceIfUnmodifiedSince"
  ],
  mapper: {
    serializedName: "x-ms-source-if-unmodified-since",
    type: {
      name: "DateTimeRfc1123"
    }
  }
};
export const sourceLeaseId: coreHttp.OperationParameter = {
  parameterPath: [
    "options",
    "sourceLeaseId"
  ],
  mapper: {
    serializedName: "x-ms-source-lease-id",
    type: {
      name: "String"
    }
  }
};
export const timeout: coreHttp.OperationQueryParameter = {
  parameterPath: [
    "options",
    "timeout"
  ],
  mapper: {
    serializedName: "timeout",
    constraints: {
      InclusiveMinimum: 0
    },
    type: {
      name: "Number"
    }
  }
};
export const transactionalContentHash: coreHttp.OperationParameter = {
  parameterPath: [
    "options",
    "pathHttpHeaders",
    "transactionalContentHash"
  ],
  mapper: {
    serializedName: "Content-MD5",
    type: {
      name: "ByteArray"
    }
  }
};
export const umask: coreHttp.OperationParameter = {
  parameterPath: [
    "options",
    "umask"
  ],
  mapper: {
    serializedName: "x-ms-umask",
    type: {
      name: "String"
    }
  }
};
export const upn: coreHttp.OperationQueryParameter = {
  parameterPath: [
    "options",
    "upn"
  ],
  mapper: {
    serializedName: "upn",
    type: {
      name: "Boolean"
    }
  }
};
export const url: coreHttp.OperationURLParameter = {
  parameterPath: "url",
  mapper: {
    required: true,
    serializedName: "url",
    defaultValue: '',
    type: {
      name: "String"
    }
  },
  skipEncoding: true
};
export const version: coreHttp.OperationParameter = {
  parameterPath: "version",
  mapper: {
    required: true,
    isConstant: true,
    serializedName: "x-ms-version",
    defaultValue: '2019-12-12',
    type: {
      name: "String"
    }
  }
};
export const xMsLeaseAction: coreHttp.OperationParameter = {
  parameterPath: "xMsLeaseAction",
  mapper: {
    required: true,
    serializedName: "x-ms-lease-action",
    type: {
      name: "Enum",
      allowedValues: [
        "acquire",
        "break",
        "change",
        "renew",
        "release"
      ]
    }
  }
};
export const xMsLeaseBreakPeriod: coreHttp.OperationParameter = {
  parameterPath: [
    "options",
    "xMsLeaseBreakPeriod"
  ],
  mapper: {
    serializedName: "x-ms-lease-break-period",
    type: {
      name: "Number"
    }
  }
};
export const xMsLeaseDuration: coreHttp.OperationParameter = {
  parameterPath: [
    "options",
    "xMsLeaseDuration"
  ],
  mapper: {
    serializedName: "x-ms-lease-duration",
    type: {
      name: "Number"
    }
  }
};
export const xMsRangeGetContentMd5: coreHttp.OperationParameter = {
  parameterPath: [
    "options",
    "xMsRangeGetContentMd5"
  ],
  mapper: {
    serializedName: "x-ms-range-get-content-md5",
    type: {
      name: "Boolean"
    }
  }
};
