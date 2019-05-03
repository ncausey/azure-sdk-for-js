/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { CloudErrorMapper, BaseResourceMapper } from "@azure/ms-rest-azure-js";
import * as msRest from "@azure/ms-rest-js";

export const CloudError = CloudErrorMapper;
export const BaseResource = BaseResourceMapper;

export const ARecord: msRest.CompositeMapper = {
  serializedName: "ARecord",
  type: {
    name: "Composite",
    className: "ARecord",
    modelProperties: {
      ipv4Address: {
        serializedName: "ipv4Address",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const AaaaRecord: msRest.CompositeMapper = {
  serializedName: "AaaaRecord",
  type: {
    name: "Composite",
    className: "AaaaRecord",
    modelProperties: {
      ipv6Address: {
        serializedName: "ipv6Address",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const MxRecord: msRest.CompositeMapper = {
  serializedName: "MxRecord",
  type: {
    name: "Composite",
    className: "MxRecord",
    modelProperties: {
      preference: {
        serializedName: "preference",
        type: {
          name: "Number"
        }
      },
      exchange: {
        serializedName: "exchange",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const NsRecord: msRest.CompositeMapper = {
  serializedName: "NsRecord",
  type: {
    name: "Composite",
    className: "NsRecord",
    modelProperties: {
      nsdname: {
        serializedName: "nsdname",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const PtrRecord: msRest.CompositeMapper = {
  serializedName: "PtrRecord",
  type: {
    name: "Composite",
    className: "PtrRecord",
    modelProperties: {
      ptrdname: {
        serializedName: "ptrdname",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const SrvRecord: msRest.CompositeMapper = {
  serializedName: "SrvRecord",
  type: {
    name: "Composite",
    className: "SrvRecord",
    modelProperties: {
      priority: {
        serializedName: "priority",
        type: {
          name: "Number"
        }
      },
      weight: {
        serializedName: "weight",
        type: {
          name: "Number"
        }
      },
      port: {
        serializedName: "port",
        type: {
          name: "Number"
        }
      },
      target: {
        serializedName: "target",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const TxtRecord: msRest.CompositeMapper = {
  serializedName: "TxtRecord",
  type: {
    name: "Composite",
    className: "TxtRecord",
    modelProperties: {
      value: {
        serializedName: "value",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "String"
            }
          }
        }
      }
    }
  }
};

export const CnameRecord: msRest.CompositeMapper = {
  serializedName: "CnameRecord",
  type: {
    name: "Composite",
    className: "CnameRecord",
    modelProperties: {
      cname: {
        serializedName: "cname",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const SoaRecord: msRest.CompositeMapper = {
  serializedName: "SoaRecord",
  type: {
    name: "Composite",
    className: "SoaRecord",
    modelProperties: {
      host: {
        serializedName: "host",
        type: {
          name: "String"
        }
      },
      email: {
        serializedName: "email",
        type: {
          name: "String"
        }
      },
      serialNumber: {
        serializedName: "serialNumber",
        type: {
          name: "Number"
        }
      },
      refreshTime: {
        serializedName: "refreshTime",
        type: {
          name: "Number"
        }
      },
      retryTime: {
        serializedName: "retryTime",
        type: {
          name: "Number"
        }
      },
      expireTime: {
        serializedName: "expireTime",
        type: {
          name: "Number"
        }
      },
      minimumTtl: {
        serializedName: "minimumTTL",
        type: {
          name: "Number"
        }
      }
    }
  }
};

export const RecordSet: msRest.CompositeMapper = {
  serializedName: "RecordSet",
  type: {
    name: "Composite",
    className: "RecordSet",
    modelProperties: {
      id: {
        serializedName: "id",
        type: {
          name: "String"
        }
      },
      name: {
        serializedName: "name",
        type: {
          name: "String"
        }
      },
      type: {
        serializedName: "type",
        type: {
          name: "String"
        }
      },
      etag: {
        serializedName: "etag",
        type: {
          name: "String"
        }
      },
      metadata: {
        serializedName: "properties.metadata",
        type: {
          name: "Dictionary",
          value: {
            type: {
              name: "String"
            }
          }
        }
      },
      tTL: {
        serializedName: "properties.TTL",
        type: {
          name: "Number"
        }
      },
      aRecords: {
        serializedName: "properties.ARecords",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "ARecord"
            }
          }
        }
      },
      aaaaRecords: {
        serializedName: "properties.AAAARecords",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "AaaaRecord"
            }
          }
        }
      },
      mxRecords: {
        serializedName: "properties.MXRecords",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "MxRecord"
            }
          }
        }
      },
      nsRecords: {
        serializedName: "properties.NSRecords",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "NsRecord"
            }
          }
        }
      },
      ptrRecords: {
        serializedName: "properties.PTRRecords",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "PtrRecord"
            }
          }
        }
      },
      srvRecords: {
        serializedName: "properties.SRVRecords",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "SrvRecord"
            }
          }
        }
      },
      txtRecords: {
        serializedName: "properties.TXTRecords",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "TxtRecord"
            }
          }
        }
      },
      cnameRecord: {
        serializedName: "properties.CNAMERecord",
        type: {
          name: "Composite",
          className: "CnameRecord"
        }
      },
      soaRecord: {
        serializedName: "properties.SOARecord",
        type: {
          name: "Composite",
          className: "SoaRecord"
        }
      }
    }
  }
};

export const RecordSetUpdateParameters: msRest.CompositeMapper = {
  serializedName: "RecordSetUpdateParameters",
  type: {
    name: "Composite",
    className: "RecordSetUpdateParameters",
    modelProperties: {
      recordSet: {
        serializedName: "RecordSet",
        type: {
          name: "Composite",
          className: "RecordSet"
        }
      }
    }
  }
};

export const Resource: msRest.CompositeMapper = {
  serializedName: "Resource",
  type: {
    name: "Composite",
    className: "Resource",
    modelProperties: {
      id: {
        readOnly: true,
        serializedName: "id",
        type: {
          name: "String"
        }
      },
      name: {
        readOnly: true,
        serializedName: "name",
        type: {
          name: "String"
        }
      },
      type: {
        readOnly: true,
        serializedName: "type",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const TrackedResource: msRest.CompositeMapper = {
  serializedName: "TrackedResource",
  type: {
    name: "Composite",
    className: "TrackedResource",
    modelProperties: {
      ...Resource.type.modelProperties,
      tags: {
        serializedName: "tags",
        type: {
          name: "Dictionary",
          value: {
            type: {
              name: "String"
            }
          }
        }
      },
      location: {
        required: true,
        serializedName: "location",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const Zone: msRest.CompositeMapper = {
  serializedName: "Zone",
  type: {
    name: "Composite",
    className: "Zone",
    modelProperties: {
      ...TrackedResource.type.modelProperties,
      etag: {
        serializedName: "etag",
        type: {
          name: "String"
        }
      },
      maxNumberOfRecordSets: {
        serializedName: "properties.maxNumberOfRecordSets",
        type: {
          name: "Number"
        }
      },
      numberOfRecordSets: {
        serializedName: "properties.numberOfRecordSets",
        type: {
          name: "Number"
        }
      },
      nameServers: {
        readOnly: true,
        serializedName: "properties.nameServers",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "String"
            }
          }
        }
      }
    }
  }
};

export const ZoneDeleteResult: msRest.CompositeMapper = {
  serializedName: "ZoneDeleteResult",
  type: {
    name: "Composite",
    className: "ZoneDeleteResult",
    modelProperties: {
      azureAsyncOperation: {
        serializedName: "azureAsyncOperation",
        type: {
          name: "String"
        }
      },
      status: {
        serializedName: "status",
        type: {
          name: "Enum",
          allowedValues: [
            "InProgress",
            "Succeeded",
            "Failed"
          ]
        }
      },
      statusCode: {
        serializedName: "statusCode",
        type: {
          name: "Enum",
          allowedValues: [
            "Continue",
            "SwitchingProtocols",
            "OK",
            "Created",
            "Accepted",
            "NonAuthoritativeInformation",
            "NoContent",
            "ResetContent",
            "PartialContent",
            "MultipleChoices",
            "Ambiguous",
            "MovedPermanently",
            "Moved",
            "Found",
            "Redirect",
            "SeeOther",
            "RedirectMethod",
            "NotModified",
            "UseProxy",
            "Unused",
            "TemporaryRedirect",
            "RedirectKeepVerb",
            "BadRequest",
            "Unauthorized",
            "PaymentRequired",
            "Forbidden",
            "NotFound",
            "MethodNotAllowed",
            "NotAcceptable",
            "ProxyAuthenticationRequired",
            "RequestTimeout",
            "Conflict",
            "Gone",
            "LengthRequired",
            "PreconditionFailed",
            "RequestEntityTooLarge",
            "RequestUriTooLong",
            "UnsupportedMediaType",
            "RequestedRangeNotSatisfiable",
            "ExpectationFailed",
            "UpgradeRequired",
            "InternalServerError",
            "NotImplemented",
            "BadGateway",
            "ServiceUnavailable",
            "GatewayTimeout",
            "HttpVersionNotSupported"
          ]
        }
      },
      requestId: {
        serializedName: "requestId",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const ProxyResource: msRest.CompositeMapper = {
  serializedName: "ProxyResource",
  type: {
    name: "Composite",
    className: "ProxyResource",
    modelProperties: {
      ...Resource.type.modelProperties
    }
  }
};

export const AzureEntityResource: msRest.CompositeMapper = {
  serializedName: "AzureEntityResource",
  type: {
    name: "Composite",
    className: "AzureEntityResource",
    modelProperties: {
      ...Resource.type.modelProperties,
      etag: {
        readOnly: true,
        serializedName: "etag",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const RecordSetListResult: msRest.CompositeMapper = {
  serializedName: "RecordSetListResult",
  type: {
    name: "Composite",
    className: "RecordSetListResult",
    modelProperties: {
      value: {
        serializedName: "",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "RecordSet"
            }
          }
        }
      },
      nextLink: {
        serializedName: "nextLink",
        type: {
          name: "String"
        }
      }
    }
  }
};

export const ZoneListResult: msRest.CompositeMapper = {
  serializedName: "ZoneListResult",
  type: {
    name: "Composite",
    className: "ZoneListResult",
    modelProperties: {
      value: {
        serializedName: "",
        type: {
          name: "Sequence",
          element: {
            type: {
              name: "Composite",
              className: "Zone"
            }
          }
        }
      },
      nextLink: {
        serializedName: "nextLink",
        type: {
          name: "String"
        }
      }
    }
  }
};
