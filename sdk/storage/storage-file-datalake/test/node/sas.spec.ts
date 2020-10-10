import { UserDelegationKey } from "@azure/storage-blob";
import { record, Recorder } from "@azure/test-utils-recorder";
import * as assert from "assert";

import {
  AccountSASPermissions,
  AccountSASResourceTypes,
  AccountSASServices,
  AnonymousCredential,
  DataLakeDirectoryClient,
  DataLakeFileSystemClient,
  DataLakeSASPermissions,
  DataLakeServiceClient,
  FileSystemSASPermissions,
  generateAccountSASQueryParameters,
  generateDataLakeSASQueryParameters,
  newPipeline,
  PathAccessControlItem,
  PathPermissions,
  StorageSharedKeyCredential,
  SASQueryParameters
} from "../../src";
import { DataLakeFileClient } from "../../src/";
import { SASProtocol } from "../../src/sas/SASQueryParameters";
import {
  getDataLakeServiceClient,
  getTokenDataLakeServiceClient,
  recorderEnvSetup
} from "../utils";

describe("Shared Access Signature (SAS) generation Node.js only", () => {
  let recorder: Recorder;
  let serviceClient: DataLakeServiceClient;

  beforeEach(function() {
    recorder = record(this, recorderEnvSetup);
    serviceClient = getDataLakeServiceClient();
  });

  afterEach(async function() {
    await recorder.stop();
  });

  it("generateAccountSASQueryParameters should work", async () => {
    const now = recorder.newDate("now");
    now.setMinutes(now.getMinutes() - 10); // Skip clock skew with server

    const tmr = recorder.newDate("tmr");
    tmr.setDate(tmr.getDate() + 10);

    // By default, credential is always the last element of pipeline factories
    const factories = (serviceClient as any).pipeline.factories;
    const sharedKeyCredential = factories[factories.length - 1];

    const sas = generateAccountSASQueryParameters(
      {
        expiresOn: tmr,
        ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
        permissions: AccountSASPermissions.parse("rwdlacup"),
        protocol: SASProtocol.HttpsAndHttp,
        resourceTypes: AccountSASResourceTypes.parse("sco").toString(),
        services: AccountSASServices.parse("btqf").toString(),
        startsOn: now,
        version: "2016-05-31"
      },
      sharedKeyCredential as StorageSharedKeyCredential
    ).toString();

    const sasClient = `${serviceClient.url}?${sas}`;
    const serviceClientWithSAS = new DataLakeServiceClient(sasClient, newPipeline());

    await serviceClientWithSAS.listFileSystems().next();
  });

  it("generateAccountSASQueryParameters should not work with invalid permission", async () => {
    const tmr = recorder.newDate("tmr");
    tmr.setDate(tmr.getDate() + 10);

    // By default, credential is always the last element of pipeline factories
    const factories = (serviceClient as any).pipeline.factories;
    const sharedKeyCredential = factories[factories.length - 1];

    const sas = generateAccountSASQueryParameters(
      {
        expiresOn: tmr,
        permissions: AccountSASPermissions.parse("wd"),
        resourceTypes: AccountSASResourceTypes.parse("sco").toString(),
        services: AccountSASServices.parse("btqf").toString()
      },
      sharedKeyCredential as StorageSharedKeyCredential
    ).toString();

    const sasClient = `${serviceClient.url}?${sas}`;
    const serviceClientWithSAS = new DataLakeServiceClient(
      sasClient,
      newPipeline(new AnonymousCredential())
    );

    let error;
    try {
      await serviceClientWithSAS.listFileSystems().next();
    } catch (err) {
      error = err;
    }

    assert.ok(error);
  });

  it("generateAccountSASQueryParameters should not work with invalid service", async () => {
    const tmr = recorder.newDate("tmr");
    tmr.setDate(tmr.getDate() + 10);

    // By default, credential is always the last element of pipeline factories
    const factories = (serviceClient as any).pipeline.factories;
    const sharedKeyCredential = factories[factories.length - 1];

    const sas = generateAccountSASQueryParameters(
      {
        expiresOn: tmr,
        permissions: AccountSASPermissions.parse("rwdlacup"),
        resourceTypes: AccountSASResourceTypes.parse("sco").toString(),
        services: AccountSASServices.parse("tqf").toString()
      },
      sharedKeyCredential as StorageSharedKeyCredential
    ).toString();

    const sasClient = `${serviceClient.url}?${sas}`;
    const serviceClientWithSAS = new DataLakeServiceClient(
      sasClient,
      newPipeline(new AnonymousCredential())
    );

    let error;
    try {
      await serviceClientWithSAS.listFileSystems().next();
    } catch (err) {
      error = err;
    }

    assert.ok(error);
  });

  it("generateAccountSASQueryParameters should not work with invalid resource type", async () => {
    const tmr = recorder.newDate("tmr");
    tmr.setDate(tmr.getDate() + 10);

    // By default, credential is always the last element of pipeline factories
    const factories = (serviceClient as any).pipeline.factories;
    const sharedKeyCredential = factories[factories.length - 1];

    const sas = generateAccountSASQueryParameters(
      {
        expiresOn: tmr,
        ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
        permissions: AccountSASPermissions.parse("rwdlacup"),
        protocol: SASProtocol.HttpsAndHttp,
        resourceTypes: AccountSASResourceTypes.parse("co").toString(),
        services: AccountSASServices.parse("btqf").toString(),
        version: "2016-05-31"
      },
      sharedKeyCredential as StorageSharedKeyCredential
    ).toString();

    const sasClient = `${serviceClient.url}?${sas}`;
    const serviceClientWithSAS = new DataLakeServiceClient(
      sasClient,
      newPipeline(new AnonymousCredential())
    );

    let error;
    try {
      await serviceClientWithSAS.listFileSystems().next();
    } catch (err) {
      error = err;
    }

    assert.ok(error);
  });

  it("generateDataLakeSASQueryParameters should work for filesystem", async () => {
    const now = recorder.newDate("now");
    now.setMinutes(now.getMinutes() - 10); // Skip clock skew with server

    const tmr = recorder.newDate("tmr");
    tmr.setDate(tmr.getDate() + 10);

    // By default, credential is always the last element of pipeline factories
    const factories = (serviceClient as any).pipeline.factories;
    const sharedKeyCredential = factories[factories.length - 1];

    const fileSystemName = recorder.getUniqueName("filesystem");
    const fileSystemClient = serviceClient.getFileSystemClient(fileSystemName);
    await fileSystemClient.create();

    const containerSAS = generateDataLakeSASQueryParameters(
      {
        fileSystemName: fileSystemClient.name,
        expiresOn: tmr,
        ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
        permissions: FileSystemSASPermissions.parse("racwdl"),
        protocol: SASProtocol.HttpsAndHttp,
        startsOn: now,
        version: "2016-05-31"
      },
      sharedKeyCredential as StorageSharedKeyCredential
    );

    const sasClient = `${fileSystemClient.url}?${containerSAS}`;
    const fileSystemClientwithSAS = new DataLakeFileSystemClient(
      sasClient,
      newPipeline(new AnonymousCredential())
    );

    (
      await fileSystemClientwithSAS
        .listPaths()
        .byPage()
        .next()
    ).value;
    await fileSystemClient.delete();
  });

  it("generateDataLakeSASQueryParameters should work for file with previous API version", async () => {
    const now = recorder.newDate("now");
    now.setMinutes(now.getMinutes() - 10); // Skip clock skew with server

    const tmr = recorder.newDate("tmr");
    tmr.setDate(tmr.getDate() + 10);

    // By default, credential is always the last element of pipeline factories
    const factories = (serviceClient as any).pipeline.factories;
    const sharedKeyCredential = factories[factories.length - 1];

    const fileSystemName = recorder.getUniqueName("filesystem");
    const fileSystemClient = serviceClient.getFileSystemClient(fileSystemName);
    await fileSystemClient.create();
    const fileName = recorder.getUniqueName("file");
    const fileClient = fileSystemClient.getFileClient(fileName);
    await fileClient.create({
      pathHttpHeaders: {
        contentType: "content-type-original"
      }
    });

    const fileSAS = generateDataLakeSASQueryParameters(
      {
        pathName: fileClient.name,
        cacheControl: "cache-control-override",
        fileSystemName: fileClient.fileSystemName,
        contentDisposition: "content-disposition-override",
        contentEncoding: "content-encoding-override",
        contentLanguage: "content-language-override",
        contentType: "content-type-override",
        expiresOn: tmr,
        ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
        permissions: DataLakeSASPermissions.parse("racwd"),
        protocol: SASProtocol.HttpsAndHttp,
        startsOn: now,
        version: "2016-05-31"
      },
      sharedKeyCredential as StorageSharedKeyCredential
    );

    const sasClient = `${fileClient.url}?${fileSAS}`;
    const fileClientWithSAS = new DataLakeFileClient(
      sasClient,
      newPipeline(new AnonymousCredential())
    );

    const properties = await fileClientWithSAS.getProperties();
    assert.equal(properties.cacheControl, "cache-control-override");
    assert.equal(properties.contentDisposition, "content-disposition-override");
    assert.equal(properties.contentEncoding, "content-encoding-override");
    assert.equal(properties.contentLanguage, "content-language-override");
    assert.equal(properties.contentType, "content-type-override");

    await fileSystemClient.delete();
  });

  it("generateDataLakeSASQueryParameters should work for file", async () => {
    const now = recorder.newDate("now");
    now.setMinutes(now.getMinutes() - 10); // Skip clock skew with server

    const tmr = recorder.newDate("tmr");
    tmr.setDate(tmr.getDate() + 10);

    // By default, credential is always the last element of pipeline factories
    const factories = (serviceClient as any).pipeline.factories;
    const sharedKeyCredential = factories[factories.length - 1];

    const fileSystemName = recorder.getUniqueName("filesystem");
    const fileSystemClient = serviceClient.getFileSystemClient(fileSystemName);
    await fileSystemClient.create();

    const fileName = recorder.getUniqueName("file");
    const fileClient = fileSystemClient.getFileClient(fileName);
    await fileClient.create({
      pathHttpHeaders: {
        contentType: "content-type-original"
      }
    });

    const fileSAS = generateDataLakeSASQueryParameters(
      {
        pathName: fileClient.name,
        cacheControl: "cache-control-override",
        fileSystemName: fileClient.fileSystemName,
        contentDisposition: "content-disposition-override",
        contentEncoding: "content-encoding-override",
        contentLanguage: "content-language-override",
        contentType: "content-type-override",
        expiresOn: tmr,
        ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
        permissions: DataLakeSASPermissions.parse("racwd"),
        protocol: SASProtocol.HttpsAndHttp,
        startsOn: now
      },
      sharedKeyCredential as StorageSharedKeyCredential
    );

    const sasURL = `${fileClient.url}?${fileSAS}`;
    const fileClientWithSAS = new DataLakeFileClient(
      sasURL,
      newPipeline(new AnonymousCredential())
    );

    const properties = await fileClientWithSAS.getProperties();
    assert.equal(properties.cacheControl, "cache-control-override");
    assert.equal(properties.contentDisposition, "content-disposition-override");
    assert.equal(properties.contentEncoding, "content-encoding-override");
    assert.equal(properties.contentLanguage, "content-language-override");
    assert.equal(properties.contentType, "content-type-override");

    await fileSystemClient.delete();
  });

  it("generateDataLakeSASQueryParameters should work for file with special namings", async () => {
    const now = recorder.newDate("now");
    now.setMinutes(now.getMinutes() - 10); // Skip clock skew with server

    const tmr = recorder.newDate("tmr");
    tmr.setDate(tmr.getDate() + 10);

    // By default, credential is always the last element of pipeline factories
    const factories = (serviceClient as any).pipeline.factories;
    const sharedKeyCredential = factories[factories.length - 1];

    const fileSystemName = recorder.getUniqueName("filesystem-with-dash");
    const fileSystemClient = serviceClient.getFileSystemClient(fileSystemName);
    await fileSystemClient.create();

    // NOTICE: Azure Storage Server will replace "\" with "/" in the file names
    const fileName = recorder.getUniqueName(
      "Upper file empty another 汉字 ру́сский язы́к ру́сский язы́к عرعربى にっぽんごにほんご . special ~!@#$%^&*()_+`1234567890-={}|[]:\";'<>?,'"
    );
    const fileClient = fileSystemClient.getFileClient(fileName);
    await fileClient.create({
      pathHttpHeaders: {
        contentType: "content-type-original"
      }
    });
    const fileSAS = generateDataLakeSASQueryParameters(
      {
        pathName: fileClient.name,
        cacheControl: "cache-control-override",
        fileSystemName: fileClient.fileSystemName,
        contentDisposition: "content-disposition-override",
        contentEncoding: "content-encoding-override",
        contentLanguage: "content-language-override",
        contentType: "content-type-override",
        expiresOn: tmr,
        ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
        permissions: DataLakeSASPermissions.parse("racwd"),
        protocol: SASProtocol.HttpsAndHttp,
        startsOn: now,
        version: "2016-05-31"
      },
      sharedKeyCredential as StorageSharedKeyCredential
    );

    const sasClient = `${fileClient.url}?${fileSAS}`;
    const fileClientWithSAS = new DataLakeFileClient(
      sasClient,
      newPipeline(new AnonymousCredential())
    );

    const properties = await fileClientWithSAS.getProperties();
    assert.equal(properties.cacheControl, "cache-control-override");
    assert.equal(properties.contentDisposition, "content-disposition-override");
    assert.equal(properties.contentEncoding, "content-encoding-override");
    assert.equal(properties.contentLanguage, "content-language-override");
    assert.equal(properties.contentType, "content-type-override");

    await fileSystemClient.delete();
  });

  it("generateDataLakeSASQueryParameters should work for file with access policy", async () => {
    const now = recorder.newDate("now");
    now.setMinutes(now.getMinutes() - 10); // Skip clock skew with server

    const tmr = recorder.newDate("tmr");
    tmr.setDate(tmr.getDate() + 10);

    // By default, credential is always the last element of pipeline factories
    const factories = (serviceClient as any).pipeline.factories;
    const sharedKeyCredential = factories[factories.length - 1];

    const fileSystemName = recorder.getUniqueName("filesystem");
    const fileSystemClient = serviceClient.getFileSystemClient(fileSystemName);
    await fileSystemClient.create();

    const fileName = recorder.getUniqueName("file");
    const fileClient = fileSystemClient.getFileClient(fileName);
    await fileClient.create();

    const id = "unique-id";
    await fileSystemClient.setAccessPolicy(undefined, [
      {
        accessPolicy: {
          expiresOn: tmr,
          permissions: FileSystemSASPermissions.parse("racwdl").toString(),
          startsOn: now
        },
        id
      }
    ]);

    const fileSAS = generateDataLakeSASQueryParameters(
      {
        fileSystemName,
        identifier: id
      },
      sharedKeyCredential as StorageSharedKeyCredential
    );

    const sasClient = `${fileClient.url}?${fileSAS}`;
    const fileClientWithSAS = new DataLakeFileClient(
      sasClient,
      newPipeline(new AnonymousCredential())
    );

    await fileClientWithSAS.getProperties();
    await fileSystemClient.delete();
  });

  it("GenerateUserDelegationSAS should work for filesystem with all configurations", async function() {
    // Try to get DataLakeServiceClient object with TokenCredential
    // when DFS_ACCOUNT_TOKEN environment variable is set
    let serviceClientWithToken: DataLakeServiceClient | undefined;
    try {
      serviceClientWithToken = getTokenDataLakeServiceClient();
    } catch {}

    // Requires bearer token for this case which cannot be generated in the runtime
    // Make sure this case passed in sanity test
    if (serviceClientWithToken === undefined) {
      this.skip();
    }

    const now = recorder.newDate("now");
    now.setHours(now.getHours() - 1);
    const tmr = recorder.newDate("tmr");
    tmr.setDate(tmr.getDate() + 5);
    const userDelegationKey = await serviceClientWithToken!.getUserDelegationKey(now, tmr);

    // By default, credential is always the last element of pipeline factories
    const factories = (serviceClient as any).pipeline.factories;
    const sharedKeyCredential = factories[factories.length - 1] as StorageSharedKeyCredential;
    const accountName = sharedKeyCredential.accountName;

    const fileSystemName = recorder.getUniqueName("filesystem");
    const fileSystemClient = serviceClient.getFileSystemClient(fileSystemName);
    await fileSystemClient.create();

    const containerSAS = generateDataLakeSASQueryParameters(
      {
        fileSystemName: fileSystemClient.name,
        expiresOn: tmr,
        ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
        permissions: FileSystemSASPermissions.parse("racwdl"),
        protocol: SASProtocol.HttpsAndHttp,
        startsOn: now,
        version: "2019-02-02"
      },
      userDelegationKey,
      accountName
    );

    const sasClient = `${fileSystemClient.url}?${containerSAS}`;
    const fileSystemClientwithSAS = new DataLakeFileSystemClient(
      sasClient,
      newPipeline(new AnonymousCredential())
    );

    (
      await fileSystemClientwithSAS
        .listPaths()
        .byPage()
        .next()
    ).value;
    await fileSystemClient.delete();
  });

  it("GenerateUserDelegationSAS should work for filesystem with minimum parameters", async function() {
    // Try to get DataLakeServiceClient object with TokenCredential
    // when DFS_ACCOUNT_TOKEN environment variable is set
    let serviceClientWithToken: DataLakeServiceClient | undefined;
    try {
      serviceClientWithToken = getTokenDataLakeServiceClient();
    } catch {}

    // Requires bearer token for this case which cannot be generated in the runtime
    // Make sure this case passed in sanity test
    if (serviceClientWithToken === undefined) {
      this.skip();
    }

    const now = recorder.newDate("now");
    now.setHours(now.getHours() - 1);
    const tmr = recorder.newDate("tmr");
    tmr.setDate(tmr.getDate() + 5);
    const userDelegationKey = await serviceClientWithToken!.getUserDelegationKey(now, tmr);

    // By default, credential is always the last element of pipeline factories
    const factories = (serviceClient as any).pipeline.factories;
    const sharedKeyCredential = factories[factories.length - 1] as StorageSharedKeyCredential;
    const accountName = sharedKeyCredential.accountName;

    const fileSystemName = recorder.getUniqueName("filesystem");
    const fileSystemClient = serviceClient.getFileSystemClient(fileSystemName);
    await fileSystemClient.create();

    const containerSAS = generateDataLakeSASQueryParameters(
      {
        fileSystemName: fileSystemClient.name,
        expiresOn: tmr,
        permissions: FileSystemSASPermissions.parse("racwdl")
      },
      userDelegationKey,
      accountName
    );

    const sasClient = `${fileSystemClient.url}?${containerSAS}`;
    const fileSystemClientwithSAS = new DataLakeFileSystemClient(
      sasClient,
      newPipeline(new AnonymousCredential())
    );

    (
      await fileSystemClientwithSAS
        .listPaths()
        .byPage()
        .next()
    ).value;
    await fileSystemClient.delete();
  });

  it("GenerateUserDelegationSAS should work for file", async function() {
    // Try to get serviceClient object with TokenCredential
    // when DFS_ACCOUNT_TOKEN environment variable is set
    let serviceClientWithToken: DataLakeServiceClient | undefined;
    try {
      serviceClientWithToken = getTokenDataLakeServiceClient();
    } catch {}

    // Requires bearer token for this case which cannot be generated in the runtime
    // Make sure this case passed in sanity test
    if (serviceClientWithToken === undefined) {
      this.skip();
    }

    const now = recorder.newDate("now");
    now.setHours(now.getHours() - 1);
    const tmr = recorder.newDate("tmr");
    tmr.setDate(tmr.getDate() + 5);
    const userDelegationKey = await serviceClientWithToken!.getUserDelegationKey(now, tmr);

    // By default, credential is always the last element of pipeline factories
    const factories = (serviceClient as any).pipeline.factories;
    const sharedKeyCredential = factories[factories.length - 1] as StorageSharedKeyCredential;
    const accountName = sharedKeyCredential.accountName;

    const fileSystemName = recorder.getUniqueName("filesystem");
    const fileSystemClient = serviceClient.getFileSystemClient(fileSystemName);
    await fileSystemClient.create();

    const fileName = recorder.getUniqueName("file");
    const fileClient = fileSystemClient.getFileClient(fileName);
    await fileClient.create({
      pathHttpHeaders: {
        contentType: "content-type-original"
      }
    });

    const fileSAS = generateDataLakeSASQueryParameters(
      {
        pathName: fileClient.name,
        cacheControl: "cache-control-override",
        fileSystemName: fileClient.fileSystemName,
        contentDisposition: "content-disposition-override",
        contentEncoding: "content-encoding-override",
        contentLanguage: "content-language-override",
        contentType: "content-type-override",
        expiresOn: tmr,
        ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
        permissions: DataLakeSASPermissions.parse("racwd"),
        protocol: SASProtocol.HttpsAndHttp,
        startsOn: now
      },
      userDelegationKey,
      accountName
    );

    const sasClient = `${fileClient.url}?${fileSAS}`;
    const fileClientWithSAS = new DataLakeFileClient(
      sasClient,
      newPipeline(new AnonymousCredential())
    );

    const properties = await fileClientWithSAS.getProperties();
    assert.equal(properties.cacheControl, "cache-control-override");
    assert.equal(properties.contentDisposition, "content-disposition-override");
    assert.equal(properties.contentEncoding, "content-encoding-override");
    assert.equal(properties.contentLanguage, "content-language-override");
    assert.equal(properties.contentType, "content-type-override");

    await fileSystemClient.delete();
  });

  it("construct SASQueryParameters with a option bag", async () => {
    // no option and optional parameters
    const sasQP = new SASQueryParameters("2020-02-10", "signature");
    assert.equal(sasQP.toString(), "sv=2020-02-10&sig=signature");

    const sasQP2 = new SASQueryParameters("2020-02-10", "signature", {
      permissions: "permissions",
      correlationId: "correlationId",
      directoryDepth: 2,
      preauthorizedAgentObjectId: "preauthorizedAgentObjectId"
    });
    assert.equal(
      sasQP2.toString(),
      "sv=2020-02-10&sp=permissions&sig=signature&sdd=2&saoid=preauthorizedAgentObjectId&scid=correlationId"
    );

    const sasQP3 = new SASQueryParameters(
      "2020-02-10",
      "signature",
      "permissions",
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      2,
      "preauthorizedAgentObjectId",
      undefined,
      "correlationId"
    );
    assert.equal(
      sasQP3.toString(),
      "sv=2020-02-10&sp=permissions&sig=signature&sdd=2&saoid=preauthorizedAgentObjectId&scid=correlationId"
    );
  });
});

describe("SAS generation Node.js only for directory SAS", () => {
  let recorder: Recorder;
  let serviceClient: DataLakeServiceClient;
  let fileSystemClient: DataLakeFileSystemClient;
  let directoryClient: DataLakeDirectoryClient;
  let fileClient: DataLakeFileClient;
  let sharedKeyCredential: StorageSharedKeyCredential;
  let now: Date;
  let tmr: Date;

  const permissions: PathPermissions = {
    extendedAcls: false,
    stickyBit: true,
    owner: {
      read: true,
      write: true,
      execute: false
    },
    group: {
      read: true,
      write: false,
      execute: true
    },
    other: {
      read: false,
      write: true,
      execute: false
    }
  };

  beforeEach(async function() {
    recorder = record(this, recorderEnvSetup);
    serviceClient = getDataLakeServiceClient();

    const fileSystemName = recorder.getUniqueName("filesystem");
    fileSystemClient = serviceClient.getFileSystemClient(fileSystemName);
    await fileSystemClient.create();

    const directoryName = recorder.getUniqueName("directory");
    directoryClient = fileSystemClient.getDirectoryClient(directoryName);
    await directoryClient.create();

    const fileName = recorder.getUniqueName("file");
    fileClient = directoryClient.getFileClient(fileName);
    await fileClient.create();

    now = recorder.newDate("now");
    now.setMinutes(now.getMinutes() - 10); // Skip clock skew with server
    tmr = recorder.newDate("tmr");
    tmr.setDate(tmr.getDate() + 10);

    // By default, credential is always the last element of pipeline factories
    const factories = (serviceClient as any).pipeline.factories;
    sharedKeyCredential = factories[factories.length - 1];
  });

  afterEach(async function() {
    await fileSystemClient.delete();
    await recorder.stop();
  });

  it("generateDataLakeSASQueryParameters for directory should work for permissions m, e, o, p", async () => {
    const directorySAS = generateDataLakeSASQueryParameters(
      {
        fileSystemName: fileSystemClient.name,
        pathName: directoryClient.name,
        isDirectory: true,
        directoryDepth: 1,
        expiresOn: tmr,
        ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
        permissions: FileSystemSASPermissions.parse("racwdlmeop"),
        protocol: SASProtocol.HttpsAndHttp,
        startsOn: now,
        version: "2020-02-10"
      },
      sharedKeyCredential as StorageSharedKeyCredential
    );
    const sasURL = `${directoryClient.url}?${directorySAS}`;
    const directoryClientwithSAS = new DataLakeDirectoryClient(
      sasURL,
      newPipeline(new AnonymousCredential())
    );

    // e
    await directoryClientwithSAS.getAccessControl();

    // p
    await directoryClientwithSAS.setPermissions(permissions);
  });

  function getDefualtDirctorySAS(directoryName: string): SASQueryParameters {
    return generateDataLakeSASQueryParameters(
      {
        fileSystemName: fileSystemClient.name,
        pathName: directoryName,
        isDirectory: true,
        expiresOn: tmr,
        permissions: FileSystemSASPermissions.parse("racwdlmeop"),
        protocol: SASProtocol.HttpsAndHttp,
        startsOn: now,
        version: "2020-02-10"
      },
      sharedKeyCredential as StorageSharedKeyCredential
    );
  }

  it("generateDataLakeSASQueryParameters could calculate directory depth", async () => {
    const directorySAS = getDefualtDirctorySAS(directoryClient.name);
    assert.equal(directorySAS.directoryDepth, 1);
    const directoryClientwithSAS = new DataLakeDirectoryClient(
      `${directoryClient.url}?${directorySAS}`
    );
    await directoryClientwithSAS.setPermissions(permissions);

    // root directory, depth = 0
    const directorySAS2 = getDefualtDirctorySAS("");
    assert.equal(directorySAS2.directoryDepth, 0);
    const directoryClientwithSAS2 = new DataLakeDirectoryClient(
      `${directoryClient.url}?${directorySAS2}`
    );
    await directoryClientwithSAS2.setPermissions(permissions);

    // "/d1/d2/", "d1/d2", "/d1/d2" depth = 2
    const directorySAS3 = getDefualtDirctorySAS("/d1/d2/");
    assert.equal(directorySAS3.directoryDepth, 2);

    const directorySAS4 = getDefualtDirctorySAS("d1/d2");
    assert.equal(directorySAS4.directoryDepth, 2);

    const directorySAS5 = getDefualtDirctorySAS("/d1/d2");
    assert.equal(directorySAS5.directoryDepth, 2);
  });

  it("generateDataLakeSASQueryParameters for file should work for permissions m, e, o, p", async () => {
    const fileSAS = generateDataLakeSASQueryParameters(
      {
        fileSystemName: fileSystemClient.name,
        pathName: fileClient.name,
        expiresOn: tmr,
        ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
        permissions: DataLakeSASPermissions.parse("racwdmeop"),
        protocol: SASProtocol.HttpsAndHttp,
        startsOn: now,
        version: "2020-02-10"
      },
      sharedKeyCredential as StorageSharedKeyCredential
    );
    const sasURL = `${fileClient.url}?${fileSAS}`;
    const fileClientWithSAS = new DataLakeFileClient(
      sasURL,
      newPipeline(new AnonymousCredential())
    );

    // e
    await fileClientWithSAS.getAccessControl();

    // p
    await fileClientWithSAS.setPermissions(permissions);
  });

  it("generateDataLakeSASQueryParameters for filesystem should work for permissions m, e, o, p", async () => {
    const fileSystemSAS = generateDataLakeSASQueryParameters(
      {
        fileSystemName: fileSystemClient.name,
        expiresOn: tmr,
        ipRange: { start: "0.0.0.0", end: "255.255.255.255" },
        permissions: FileSystemSASPermissions.parse("racwdlmeop"),
        protocol: SASProtocol.HttpsAndHttp,
        startsOn: now,
        version: "2020-02-10"
      },
      sharedKeyCredential as StorageSharedKeyCredential
    );
    const sasURL = `${directoryClient.url}?${fileSystemSAS}`;
    const directoryClientwithSAS = new DataLakeDirectoryClient(
      sasURL,
      newPipeline(new AnonymousCredential())
    );

    // e
    await directoryClientwithSAS.getAccessControl();

    // p
    await directoryClientwithSAS.setPermissions(permissions);
  });
});

describe("SAS generation Node.js only for delegation SAS", () => {
  let recorder: Recorder;
  let oauthServiceClient: DataLakeServiceClient;
  let fileSystemClient: DataLakeFileSystemClient;
  let directoryClient: DataLakeDirectoryClient;
  let fileClient: DataLakeFileClient;
  let userDelegationKey: UserDelegationKey;
  let now: Date;
  let tmr: Date;
  let accountName: string;

  const permissions: PathPermissions = {
    extendedAcls: false,
    stickyBit: true,
    owner: {
      read: true,
      write: true,
      execute: false
    },
    group: {
      read: true,
      write: false,
      execute: true
    },
    other: {
      read: false,
      write: true,
      execute: false
    }
  };

  beforeEach(async function() {
    recorder = record(this, recorderEnvSetup);
    accountName = process.env["DFS_ACCOUNT_NAME"] || "";
    try {
      oauthServiceClient = getTokenDataLakeServiceClient();
    } catch (err) {
      console.log(err);
      this.skip();
    }

    now = recorder.newDate("now");
    now.setHours(now.getHours() - 1);
    tmr = recorder.newDate("tmr");
    tmr.setDate(tmr.getDate() + 5);
    userDelegationKey = await oauthServiceClient.getUserDelegationKey(now, tmr);

    const fileSystemName = recorder.getUniqueName("filesystem");
    fileSystemClient = oauthServiceClient.getFileSystemClient(fileSystemName);
    await fileSystemClient.create();

    const directoryName = recorder.getUniqueName("directory");
    directoryClient = fileSystemClient.getDirectoryClient(directoryName);
    await directoryClient.create();

    const fileName = recorder.getUniqueName("file");
    fileClient = directoryClient.getFileClient(fileName);
    await fileClient.create();
  });

  afterEach(async function() {
    if (fileSystemClient) {
      await fileSystemClient.delete();
    }
    await recorder.stop();
  });

  it("GenerateUserDelegationSAS for directory should work for permissions m, e, o, p", async () => {
    const fileSystemSAS = generateDataLakeSASQueryParameters(
      {
        fileSystemName: fileSystemClient.name,
        pathName: directoryClient.name,
        isDirectory: true,
        expiresOn: tmr,
        permissions: FileSystemSASPermissions.parse("racwdlmeop")
      },
      userDelegationKey,
      accountName
    );

    const sasURL = `${directoryClient.url}?${fileSystemSAS}`;
    const directoryClientwithSAS = new DataLakeDirectoryClient(sasURL);
    // e
    await directoryClientwithSAS.getAccessControl();

    // p
    await directoryClientwithSAS.setPermissions(permissions);
  });

  it("GenerateUserDelegationSAS should work with agentObjectId, preauthorizedAgentObjectId", async () => {
    const authorizedGuid = "b77d5205-ddb5-42e1-80ee-26c74a5e9333";
    const rootDirectoryClient = fileSystemClient.getDirectoryClient("/");
    const acl: PathAccessControlItem[] = [
      {
        accessControlType: "user",
        entityId: authorizedGuid,
        defaultScope: false,
        permissions: {
          read: true,
          write: true,
          execute: true
        }
      }
    ];
    await rootDirectoryClient.setAccessControl(acl);

    const fileSystemSAS = generateDataLakeSASQueryParameters(
      {
        fileSystemName: fileSystemClient.name,
        expiresOn: tmr,
        permissions: FileSystemSASPermissions.parse("racwdlmeop"),
        agentObjectId: authorizedGuid
      },
      userDelegationKey,
      accountName
    );

    const newFileName = recorder.getUniqueName("newFile");
    const newFileClient = fileSystemClient.getFileClient(newFileName);
    const newFileClientWithSAS = new DataLakeDirectoryClient(
      `${newFileClient.url}?${fileSystemSAS}`
    );
    await newFileClientWithSAS.createIfNotExists();

    const unauthoriziedGuid = "7d53815c-1b73-49ab-b44d-002bfb890633";

    // suoid for an unauthoriziedGuid
    const fileSystemSAS2 = generateDataLakeSASQueryParameters(
      {
        fileSystemName: fileSystemClient.name,
        expiresOn: tmr,
        permissions: FileSystemSASPermissions.parse("racwdlmeop"),
        agentObjectId: unauthoriziedGuid
      },
      userDelegationKey,
      accountName
    );

    const newFileClientWithSAS2 = new DataLakeDirectoryClient(
      `${newFileClient.url}?${fileSystemSAS2}`
    );
    try {
      await newFileClientWithSAS2.createIfNotExists();
    } catch (err) {
      assert.deepStrictEqual(err.details.errorCode, "AuthorizationPermissionMismatch");
    }

    // saoid for an unauthoriziedGuid
    const fileSystemSAS3 = generateDataLakeSASQueryParameters(
      {
        fileSystemName: fileSystemClient.name,
        expiresOn: tmr,
        permissions: FileSystemSASPermissions.parse("racwdlmeop"),
        preauthorizedAgentObjectId: unauthoriziedGuid
      },
      userDelegationKey,
      accountName
    );
    const newFileClientWithSAS3 = new DataLakeDirectoryClient(
      `${newFileClient.url}?${fileSystemSAS3}`
    );
    await newFileClientWithSAS3.createIfNotExists();
  });

  it("GenerateUserDelegationSAS should work with correlationId", async () => {
    const guid = "b77d5205-ddb5-42e1-80ee-26c74a5e9333";
    const fileSystemSAS = generateDataLakeSASQueryParameters(
      {
        fileSystemName: fileSystemClient.name,
        expiresOn: tmr,
        permissions: FileSystemSASPermissions.parse("racwdlmeop"),
        correlationId: guid
      },
      userDelegationKey,
      accountName
    );

    const fileSystemClientWithSAS = new DataLakeFileSystemClient(
      `${fileSystemClient.url}?${fileSystemSAS}`
    );

    await fileSystemClientWithSAS
      .listPaths()
      .byPage()
      .next();
  });
});
