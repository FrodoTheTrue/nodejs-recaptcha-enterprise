// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// ** This file is automatically generated by gapic-generator-typescript. **
// ** https://github.com/googleapis/gapic-generator-typescript **
// ** All changes to this file may be overwritten. **

import * as gax from 'google-gax';
import {
  APICallback,
  Callback,
  CallOptions,
  Descriptors,
  ClientOptions,
  PaginationCallback,
  PaginationResponse,
} from 'google-gax';
import * as path from 'path';

import {Transform} from 'stream';
import * as protosTypes from '../../protos/protos';
import * as gapicConfig from './recaptcha_enterprise_service_v1_beta1_client_config.json';

const version = require('../../../package.json').version;

/**
 *  Service to determine the likelihood an event is legitimate.
 * @class
 * @memberof v1beta1
 */
export class RecaptchaEnterpriseServiceV1Beta1Client {
  private _descriptors: Descriptors = {page: {}, stream: {}, longrunning: {}};
  private _innerApiCalls: {[name: string]: Function};
  private _pathTemplates: {[name: string]: gax.PathTemplate};
  private _terminated = false;
  auth: gax.GoogleAuth;
  recaptchaEnterpriseServiceV1Beta1Stub: Promise<{[name: string]: Function}>;

  /**
   * Construct an instance of RecaptchaEnterpriseServiceV1Beta1Client.
   *
   * @param {object} [options] - The configuration object. See the subsequent
   *   parameters for more details.
   * @param {object} [options.credentials] - Credentials object.
   * @param {string} [options.credentials.client_email]
   * @param {string} [options.credentials.private_key]
   * @param {string} [options.email] - Account email address. Required when
   *     using a .pem or .p12 keyFilename.
   * @param {string} [options.keyFilename] - Full path to the a .json, .pem, or
   *     .p12 key downloaded from the Google Developers Console. If you provide
   *     a path to a JSON file, the projectId option below is not necessary.
   *     NOTE: .pem and .p12 require you to specify options.email as well.
   * @param {number} [options.port] - The port on which to connect to
   *     the remote host.
   * @param {string} [options.projectId] - The project ID from the Google
   *     Developer's Console, e.g. 'grape-spaceship-123'. We will also check
   *     the environment variable GCLOUD_PROJECT for your project ID. If your
   *     app is running in an environment which supports
   *     {@link https://developers.google.com/identity/protocols/application-default-credentials Application Default Credentials},
   *     your project ID will be detected automatically.
   * @param {function} [options.promise] - Custom promise module to use instead
   *     of native Promises.
   * @param {string} [options.apiEndpoint] - The domain name of the
   *     API remote host.
   */

  constructor(opts?: ClientOptions) {
    // Ensure that options include the service address and port.
    const staticMembers = this
      .constructor as typeof RecaptchaEnterpriseServiceV1Beta1Client;
    const servicePath =
      opts && opts.servicePath
        ? opts.servicePath
        : opts && opts.apiEndpoint
        ? opts.apiEndpoint
        : staticMembers.servicePath;
    const port = opts && opts.port ? opts.port : staticMembers.port;

    if (!opts) {
      opts = {servicePath, port};
    }
    opts.servicePath = opts.servicePath || servicePath;
    opts.port = opts.port || port;
    opts.clientConfig = opts.clientConfig || {};

    const isBrowser = typeof window !== 'undefined';
    if (isBrowser) {
      opts.fallback = true;
    }
    // If we are in browser, we are already using fallback because of the
    // "browser" field in package.json.
    // But if we were explicitly requested to use fallback, let's do it now.
    const gaxModule = !isBrowser && opts.fallback ? gax.fallback : gax;

    // Create a `gaxGrpc` object, with any grpc-specific options
    // sent to the client.
    opts.scopes = (this
      .constructor as typeof RecaptchaEnterpriseServiceV1Beta1Client).scopes;
    const gaxGrpc = new gaxModule.GrpcClient(opts);

    // Save the auth object to the client, for use by other methods.
    this.auth = gaxGrpc.auth as gax.GoogleAuth;

    // Determine the client header string.
    const clientHeader = [`gax/${gaxModule.version}`, `gapic/${version}`];
    if (typeof process !== 'undefined' && 'versions' in process) {
      clientHeader.push(`gl-node/${process.versions.node}`);
    } else {
      clientHeader.push(`gl-web/${gaxModule.version}`);
    }
    if (!opts.fallback) {
      clientHeader.push(`grpc/${gaxGrpc.grpcVersion}`);
    }
    if (opts.libName && opts.libVersion) {
      clientHeader.push(`${opts.libName}/${opts.libVersion}`);
    }
    // Load the applicable protos.
    // For Node.js, pass the path to JSON proto file.
    // For browsers, pass the JSON content.

    const nodejsProtoPath = path.join(
      __dirname,
      '..',
      '..',
      'protos',
      'protos.json'
    );
    const protos = gaxGrpc.loadProto(
      opts.fallback ? require('../../protos/protos.json') : nodejsProtoPath
    );

    // This API contains "path templates"; forward-slash-separated
    // identifiers to uniquely identify resources within the API.
    // Create useful helper objects for these.
    this._pathTemplates = {
      projectPathTemplate: new gaxModule.PathTemplate('projects/{project}'),
      assessmentPathTemplate: new gaxModule.PathTemplate(
        'projects/{project}/assessments/{assessment}'
      ),
      keyPathTemplate: new gaxModule.PathTemplate(
        'projects/{project}/keys/{key}'
      ),
    };

    // Some of the methods on this service return "paged" results,
    // (e.g. 50 results at a time, with tokens to get subsequent
    // pages). Denote the keys used for pagination and results.
    this._descriptors.page = {
      listKeys: new gaxModule.PageDescriptor(
        'pageToken',
        'nextPageToken',
        'keys'
      ),
    };

    // Put together the default options sent with requests.
    const defaults = gaxGrpc.constructSettings(
      'google.cloud.recaptchaenterprise.v1beta1.RecaptchaEnterpriseServiceV1Beta1',
      gapicConfig as gax.ClientConfig,
      opts.clientConfig || {},
      {'x-goog-api-client': clientHeader.join(' ')}
    );

    // Set up a dictionary of "inner API calls"; the core implementation
    // of calling the API is handled in `google-gax`, with this code
    // merely providing the destination and request information.
    this._innerApiCalls = {};

    // Put together the "service stub" for
    // google.cloud.recaptchaenterprise.v1beta1.RecaptchaEnterpriseServiceV1Beta1.
    this.recaptchaEnterpriseServiceV1Beta1Stub = gaxGrpc.createStub(
      opts.fallback
        ? (protos as protobuf.Root).lookupService(
            'google.cloud.recaptchaenterprise.v1beta1.RecaptchaEnterpriseServiceV1Beta1'
          )
        : // tslint:disable-next-line no-any
          (protos as any).google.cloud.recaptchaenterprise.v1beta1
            .RecaptchaEnterpriseServiceV1Beta1,
      opts
    ) as Promise<{[method: string]: Function}>;

    // Iterate over each of the methods that the service provides
    // and create an API call method for each.
    const recaptchaEnterpriseServiceV1Beta1StubMethods = [
      'createAssessment',
      'annotateAssessment',
      'createKey',
      'listKeys',
      'getKey',
      'updateKey',
      'deleteKey',
    ];

    for (const methodName of recaptchaEnterpriseServiceV1Beta1StubMethods) {
      const innerCallPromise = this.recaptchaEnterpriseServiceV1Beta1Stub.then(
        stub => (...args: Array<{}>) => {
          if (this._terminated) {
            return Promise.reject('The client has already been closed.');
          }
          return stub[methodName].apply(stub, args);
        },
        (err: Error | null | undefined) => () => {
          throw err;
        }
      );

      const apiCall = gaxModule.createApiCall(
        innerCallPromise,
        defaults[methodName],
        this._descriptors.page[methodName] ||
          this._descriptors.stream[methodName] ||
          this._descriptors.longrunning[methodName]
      );

      this._innerApiCalls[methodName] = (
        argument: {},
        callOptions?: CallOptions,
        callback?: APICallback
      ) => {
        return apiCall(argument, callOptions, callback);
      };
    }
  }

  /**
   * The DNS address for this API service.
   */
  static get servicePath() {
    return 'recaptchaenterprise.googleapis.com';
  }

  /**
   * The DNS address for this API service - same as servicePath(),
   * exists for compatibility reasons.
   */
  static get apiEndpoint() {
    return 'recaptchaenterprise.googleapis.com';
  }

  /**
   * The port for this API service.
   */
  static get port() {
    return 443;
  }

  /**
   * The scopes needed to make gRPC calls for every method defined
   * in this service.
   */
  static get scopes() {
    return ['https://www.googleapis.com/auth/cloud-platform'];
  }

  getProjectId(): Promise<string>;
  getProjectId(callback: Callback<string, undefined, undefined>): void;
  /**
   * Return the project ID used by this class.
   * @param {function(Error, string)} callback - the callback to
   *   be called with the current project Id.
   */
  getProjectId(
    callback?: Callback<string, undefined, undefined>
  ): Promise<string> | void {
    if (callback) {
      this.auth.getProjectId(callback);
      return;
    }
    return this.auth.getProjectId();
  }

  // -------------------
  // -- Service calls --
  // -------------------
  createAssessment(
    request: protosTypes.google.cloud.recaptchaenterprise.v1beta1.ICreateAssessmentRequest,
    options?: gax.CallOptions
  ): Promise<
    [
      protosTypes.google.cloud.recaptchaenterprise.v1beta1.IAssessment,
      (
        | protosTypes.google.cloud.recaptchaenterprise.v1beta1.ICreateAssessmentRequest
        | undefined
      ),
      {} | undefined
    ]
  >;
  createAssessment(
    request: protosTypes.google.cloud.recaptchaenterprise.v1beta1.ICreateAssessmentRequest,
    options: gax.CallOptions,
    callback: Callback<
      protosTypes.google.cloud.recaptchaenterprise.v1beta1.IAssessment,
      | protosTypes.google.cloud.recaptchaenterprise.v1beta1.ICreateAssessmentRequest
      | undefined,
      {} | undefined
    >
  ): void;
  /**
   * Creates an Assessment of the likelihood an event is legitimate.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.parent
   *   Required. The name of the project in which the assessment will be created,
   *   in the format "projects/{project_number}".
   * @param {google.cloud.recaptchaenterprise.v1beta1.Assessment} request.assessment
   *   Required. The assessment details.
   * @param {object} [options]
   *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing [Assessment]{@link google.cloud.recaptchaenterprise.v1beta1.Assessment}.
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   */
  createAssessment(
    request: protosTypes.google.cloud.recaptchaenterprise.v1beta1.ICreateAssessmentRequest,
    optionsOrCallback?:
      | gax.CallOptions
      | Callback<
          protosTypes.google.cloud.recaptchaenterprise.v1beta1.IAssessment,
          | protosTypes.google.cloud.recaptchaenterprise.v1beta1.ICreateAssessmentRequest
          | undefined,
          {} | undefined
        >,
    callback?: Callback<
      protosTypes.google.cloud.recaptchaenterprise.v1beta1.IAssessment,
      | protosTypes.google.cloud.recaptchaenterprise.v1beta1.ICreateAssessmentRequest
      | undefined,
      {} | undefined
    >
  ): Promise<
    [
      protosTypes.google.cloud.recaptchaenterprise.v1beta1.IAssessment,
      (
        | protosTypes.google.cloud.recaptchaenterprise.v1beta1.ICreateAssessmentRequest
        | undefined
      ),
      {} | undefined
    ]
  > | void {
    request = request || {};
    let options: gax.CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    } else {
      options = optionsOrCallback as gax.CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      parent: request.parent || '',
    });
    return this._innerApiCalls.createAssessment(request, options, callback);
  }
  annotateAssessment(
    request: protosTypes.google.cloud.recaptchaenterprise.v1beta1.IAnnotateAssessmentRequest,
    options?: gax.CallOptions
  ): Promise<
    [
      protosTypes.google.cloud.recaptchaenterprise.v1beta1.IAnnotateAssessmentResponse,
      (
        | protosTypes.google.cloud.recaptchaenterprise.v1beta1.IAnnotateAssessmentRequest
        | undefined
      ),
      {} | undefined
    ]
  >;
  annotateAssessment(
    request: protosTypes.google.cloud.recaptchaenterprise.v1beta1.IAnnotateAssessmentRequest,
    options: gax.CallOptions,
    callback: Callback<
      protosTypes.google.cloud.recaptchaenterprise.v1beta1.IAnnotateAssessmentResponse,
      | protosTypes.google.cloud.recaptchaenterprise.v1beta1.IAnnotateAssessmentRequest
      | undefined,
      {} | undefined
    >
  ): void;
  /**
   * Annotates a previously created Assessment to provide additional information
   * on whether the event turned out to be authentic or fradulent.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.name
   *   Required. The resource name of the Assessment, in the format
   *   "projects/{project_number}/assessments/{assessment_id}".
   * @param {google.cloud.recaptchaenterprise.v1beta1.AnnotateAssessmentRequest.Annotation} request.annotation
   *   Required. The annotation that will be assigned to the Event.
   * @param {object} [options]
   *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing [AnnotateAssessmentResponse]{@link google.cloud.recaptchaenterprise.v1beta1.AnnotateAssessmentResponse}.
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   */
  annotateAssessment(
    request: protosTypes.google.cloud.recaptchaenterprise.v1beta1.IAnnotateAssessmentRequest,
    optionsOrCallback?:
      | gax.CallOptions
      | Callback<
          protosTypes.google.cloud.recaptchaenterprise.v1beta1.IAnnotateAssessmentResponse,
          | protosTypes.google.cloud.recaptchaenterprise.v1beta1.IAnnotateAssessmentRequest
          | undefined,
          {} | undefined
        >,
    callback?: Callback<
      protosTypes.google.cloud.recaptchaenterprise.v1beta1.IAnnotateAssessmentResponse,
      | protosTypes.google.cloud.recaptchaenterprise.v1beta1.IAnnotateAssessmentRequest
      | undefined,
      {} | undefined
    >
  ): Promise<
    [
      protosTypes.google.cloud.recaptchaenterprise.v1beta1.IAnnotateAssessmentResponse,
      (
        | protosTypes.google.cloud.recaptchaenterprise.v1beta1.IAnnotateAssessmentRequest
        | undefined
      ),
      {} | undefined
    ]
  > | void {
    request = request || {};
    let options: gax.CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    } else {
      options = optionsOrCallback as gax.CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      name: request.name || '',
    });
    return this._innerApiCalls.annotateAssessment(request, options, callback);
  }
  createKey(
    request: protosTypes.google.cloud.recaptchaenterprise.v1beta1.ICreateKeyRequest,
    options?: gax.CallOptions
  ): Promise<
    [
      protosTypes.google.cloud.recaptchaenterprise.v1beta1.IKey,
      (
        | protosTypes.google.cloud.recaptchaenterprise.v1beta1.ICreateKeyRequest
        | undefined
      ),
      {} | undefined
    ]
  >;
  createKey(
    request: protosTypes.google.cloud.recaptchaenterprise.v1beta1.ICreateKeyRequest,
    options: gax.CallOptions,
    callback: Callback<
      protosTypes.google.cloud.recaptchaenterprise.v1beta1.IKey,
      | protosTypes.google.cloud.recaptchaenterprise.v1beta1.ICreateKeyRequest
      | undefined,
      {} | undefined
    >
  ): void;
  /**
   * Creates a new reCAPTCHA Enterprise key.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.parent
   *   Required. The name of the project in which the key will be created, in the
   *   format "projects/{project_number}".
   * @param {google.cloud.recaptchaenterprise.v1beta1.Key} request.key
   *   Required. Information to create a reCAPTCHA Enterprise key.
   * @param {object} [options]
   *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing [Key]{@link google.cloud.recaptchaenterprise.v1beta1.Key}.
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   */
  createKey(
    request: protosTypes.google.cloud.recaptchaenterprise.v1beta1.ICreateKeyRequest,
    optionsOrCallback?:
      | gax.CallOptions
      | Callback<
          protosTypes.google.cloud.recaptchaenterprise.v1beta1.IKey,
          | protosTypes.google.cloud.recaptchaenterprise.v1beta1.ICreateKeyRequest
          | undefined,
          {} | undefined
        >,
    callback?: Callback<
      protosTypes.google.cloud.recaptchaenterprise.v1beta1.IKey,
      | protosTypes.google.cloud.recaptchaenterprise.v1beta1.ICreateKeyRequest
      | undefined,
      {} | undefined
    >
  ): Promise<
    [
      protosTypes.google.cloud.recaptchaenterprise.v1beta1.IKey,
      (
        | protosTypes.google.cloud.recaptchaenterprise.v1beta1.ICreateKeyRequest
        | undefined
      ),
      {} | undefined
    ]
  > | void {
    request = request || {};
    let options: gax.CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    } else {
      options = optionsOrCallback as gax.CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      parent: request.parent || '',
    });
    return this._innerApiCalls.createKey(request, options, callback);
  }
  getKey(
    request: protosTypes.google.cloud.recaptchaenterprise.v1beta1.IGetKeyRequest,
    options?: gax.CallOptions
  ): Promise<
    [
      protosTypes.google.cloud.recaptchaenterprise.v1beta1.IKey,
      (
        | protosTypes.google.cloud.recaptchaenterprise.v1beta1.IGetKeyRequest
        | undefined
      ),
      {} | undefined
    ]
  >;
  getKey(
    request: protosTypes.google.cloud.recaptchaenterprise.v1beta1.IGetKeyRequest,
    options: gax.CallOptions,
    callback: Callback<
      protosTypes.google.cloud.recaptchaenterprise.v1beta1.IKey,
      | protosTypes.google.cloud.recaptchaenterprise.v1beta1.IGetKeyRequest
      | undefined,
      {} | undefined
    >
  ): void;
  /**
   * Returns the specified key.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.name
   *   Required. The name of the requested key, in the format
   *   "projects/{project_number}/keys/{key_id}".
   * @param {object} [options]
   *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing [Key]{@link google.cloud.recaptchaenterprise.v1beta1.Key}.
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   */
  getKey(
    request: protosTypes.google.cloud.recaptchaenterprise.v1beta1.IGetKeyRequest,
    optionsOrCallback?:
      | gax.CallOptions
      | Callback<
          protosTypes.google.cloud.recaptchaenterprise.v1beta1.IKey,
          | protosTypes.google.cloud.recaptchaenterprise.v1beta1.IGetKeyRequest
          | undefined,
          {} | undefined
        >,
    callback?: Callback<
      protosTypes.google.cloud.recaptchaenterprise.v1beta1.IKey,
      | protosTypes.google.cloud.recaptchaenterprise.v1beta1.IGetKeyRequest
      | undefined,
      {} | undefined
    >
  ): Promise<
    [
      protosTypes.google.cloud.recaptchaenterprise.v1beta1.IKey,
      (
        | protosTypes.google.cloud.recaptchaenterprise.v1beta1.IGetKeyRequest
        | undefined
      ),
      {} | undefined
    ]
  > | void {
    request = request || {};
    let options: gax.CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    } else {
      options = optionsOrCallback as gax.CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      name: request.name || '',
    });
    return this._innerApiCalls.getKey(request, options, callback);
  }
  updateKey(
    request: protosTypes.google.cloud.recaptchaenterprise.v1beta1.IUpdateKeyRequest,
    options?: gax.CallOptions
  ): Promise<
    [
      protosTypes.google.cloud.recaptchaenterprise.v1beta1.IKey,
      (
        | protosTypes.google.cloud.recaptchaenterprise.v1beta1.IUpdateKeyRequest
        | undefined
      ),
      {} | undefined
    ]
  >;
  updateKey(
    request: protosTypes.google.cloud.recaptchaenterprise.v1beta1.IUpdateKeyRequest,
    options: gax.CallOptions,
    callback: Callback<
      protosTypes.google.cloud.recaptchaenterprise.v1beta1.IKey,
      | protosTypes.google.cloud.recaptchaenterprise.v1beta1.IUpdateKeyRequest
      | undefined,
      {} | undefined
    >
  ): void;
  /**
   * Updates the specified key.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {google.cloud.recaptchaenterprise.v1beta1.Key} request.key
   *   Required. The key to update.
   * @param {google.protobuf.FieldMask} [request.updateMask]
   *   Optional. The mask to control which field of the key get updated. If the mask is not
   *   present, all fields will be updated.
   * @param {object} [options]
   *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing [Key]{@link google.cloud.recaptchaenterprise.v1beta1.Key}.
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   */
  updateKey(
    request: protosTypes.google.cloud.recaptchaenterprise.v1beta1.IUpdateKeyRequest,
    optionsOrCallback?:
      | gax.CallOptions
      | Callback<
          protosTypes.google.cloud.recaptchaenterprise.v1beta1.IKey,
          | protosTypes.google.cloud.recaptchaenterprise.v1beta1.IUpdateKeyRequest
          | undefined,
          {} | undefined
        >,
    callback?: Callback<
      protosTypes.google.cloud.recaptchaenterprise.v1beta1.IKey,
      | protosTypes.google.cloud.recaptchaenterprise.v1beta1.IUpdateKeyRequest
      | undefined,
      {} | undefined
    >
  ): Promise<
    [
      protosTypes.google.cloud.recaptchaenterprise.v1beta1.IKey,
      (
        | protosTypes.google.cloud.recaptchaenterprise.v1beta1.IUpdateKeyRequest
        | undefined
      ),
      {} | undefined
    ]
  > | void {
    request = request || {};
    let options: gax.CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    } else {
      options = optionsOrCallback as gax.CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      'key.name': request.key!.name || '',
    });
    return this._innerApiCalls.updateKey(request, options, callback);
  }
  deleteKey(
    request: protosTypes.google.cloud.recaptchaenterprise.v1beta1.IDeleteKeyRequest,
    options?: gax.CallOptions
  ): Promise<
    [
      protosTypes.google.protobuf.IEmpty,
      (
        | protosTypes.google.cloud.recaptchaenterprise.v1beta1.IDeleteKeyRequest
        | undefined
      ),
      {} | undefined
    ]
  >;
  deleteKey(
    request: protosTypes.google.cloud.recaptchaenterprise.v1beta1.IDeleteKeyRequest,
    options: gax.CallOptions,
    callback: Callback<
      protosTypes.google.protobuf.IEmpty,
      | protosTypes.google.cloud.recaptchaenterprise.v1beta1.IDeleteKeyRequest
      | undefined,
      {} | undefined
    >
  ): void;
  /**
   * Deletes the specified key.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.name
   *   Required. The name of the key to be deleted, in the format
   *   "projects/{project_number}/keys/{key_id}".
   * @param {object} [options]
   *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is an object representing [Empty]{@link google.protobuf.Empty}.
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   */
  deleteKey(
    request: protosTypes.google.cloud.recaptchaenterprise.v1beta1.IDeleteKeyRequest,
    optionsOrCallback?:
      | gax.CallOptions
      | Callback<
          protosTypes.google.protobuf.IEmpty,
          | protosTypes.google.cloud.recaptchaenterprise.v1beta1.IDeleteKeyRequest
          | undefined,
          {} | undefined
        >,
    callback?: Callback<
      protosTypes.google.protobuf.IEmpty,
      | protosTypes.google.cloud.recaptchaenterprise.v1beta1.IDeleteKeyRequest
      | undefined,
      {} | undefined
    >
  ): Promise<
    [
      protosTypes.google.protobuf.IEmpty,
      (
        | protosTypes.google.cloud.recaptchaenterprise.v1beta1.IDeleteKeyRequest
        | undefined
      ),
      {} | undefined
    ]
  > | void {
    request = request || {};
    let options: gax.CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    } else {
      options = optionsOrCallback as gax.CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      name: request.name || '',
    });
    return this._innerApiCalls.deleteKey(request, options, callback);
  }

  listKeys(
    request: protosTypes.google.cloud.recaptchaenterprise.v1beta1.IListKeysRequest,
    options?: gax.CallOptions
  ): Promise<
    [
      protosTypes.google.cloud.recaptchaenterprise.v1beta1.IKey[],
      protosTypes.google.cloud.recaptchaenterprise.v1beta1.IListKeysRequest | null,
      protosTypes.google.cloud.recaptchaenterprise.v1beta1.IListKeysResponse
    ]
  >;
  listKeys(
    request: protosTypes.google.cloud.recaptchaenterprise.v1beta1.IListKeysRequest,
    options: gax.CallOptions,
    callback: Callback<
      protosTypes.google.cloud.recaptchaenterprise.v1beta1.IKey[],
      protosTypes.google.cloud.recaptchaenterprise.v1beta1.IListKeysRequest | null,
      protosTypes.google.cloud.recaptchaenterprise.v1beta1.IListKeysResponse
    >
  ): void;
  /**
   * Returns the list of all keys that belong to a project.
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.parent
   *   Required. The name of the project that contains the keys that will be
   *   listed, in the format "projects/{project_number}".
   * @param {number} [request.pageSize]
   *   Optional. The maximum number of keys to return. Default is 10. Max limit is
   *   1000.
   * @param {string} [request.pageToken]
   *   Optional. The next_page_token value returned from a previous.
   *   ListKeysRequest, if any.
   * @param {object} [options]
   *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
   * @returns {Promise} - The promise which resolves to an array.
   *   The first element of the array is Array of [Key]{@link google.cloud.recaptchaenterprise.v1beta1.Key}.
   *   The client library support auto-pagination by default: it will call the API as many
   *   times as needed and will merge results from all the pages into this array.
   *
   *   When autoPaginate: false is specified through options, the array has three elements.
   *   The first element is Array of [Key]{@link google.cloud.recaptchaenterprise.v1beta1.Key} that corresponds to
   *   the one page received from the API server.
   *   If the second element is not null it contains the request object of type [ListKeysRequest]{@link google.cloud.recaptchaenterprise.v1beta1.ListKeysRequest}
   *   that can be used to obtain the next page of the results.
   *   If it is null, the next page does not exist.
   *   The third element contains the raw response received from the API server. Its type is
   *   [ListKeysResponse]{@link google.cloud.recaptchaenterprise.v1beta1.ListKeysResponse}.
   *
   *   The promise has a method named "cancel" which cancels the ongoing API call.
   */
  listKeys(
    request: protosTypes.google.cloud.recaptchaenterprise.v1beta1.IListKeysRequest,
    optionsOrCallback?:
      | gax.CallOptions
      | Callback<
          protosTypes.google.cloud.recaptchaenterprise.v1beta1.IKey[],
          protosTypes.google.cloud.recaptchaenterprise.v1beta1.IListKeysRequest | null,
          protosTypes.google.cloud.recaptchaenterprise.v1beta1.IListKeysResponse
        >,
    callback?: Callback<
      protosTypes.google.cloud.recaptchaenterprise.v1beta1.IKey[],
      protosTypes.google.cloud.recaptchaenterprise.v1beta1.IListKeysRequest | null,
      protosTypes.google.cloud.recaptchaenterprise.v1beta1.IListKeysResponse
    >
  ): Promise<
    [
      protosTypes.google.cloud.recaptchaenterprise.v1beta1.IKey[],
      protosTypes.google.cloud.recaptchaenterprise.v1beta1.IListKeysRequest | null,
      protosTypes.google.cloud.recaptchaenterprise.v1beta1.IListKeysResponse
    ]
  > | void {
    request = request || {};
    let options: gax.CallOptions;
    if (typeof optionsOrCallback === 'function' && callback === undefined) {
      callback = optionsOrCallback;
      options = {};
    } else {
      options = optionsOrCallback as gax.CallOptions;
    }
    options = options || {};
    options.otherArgs = options.otherArgs || {};
    options.otherArgs.headers = options.otherArgs.headers || {};
    options.otherArgs.headers[
      'x-goog-request-params'
    ] = gax.routingHeader.fromParams({
      parent: request.parent || '',
    });
    return this._innerApiCalls.listKeys(request, options, callback);
  }

  /**
   * Equivalent to {@link listKeys}, but returns a NodeJS Stream object.
   *
   * This fetches the paged responses for {@link listKeys} continuously
   * and invokes the callback registered for 'data' event for each element in the
   * responses.
   *
   * The returned object has 'end' method when no more elements are required.
   *
   * autoPaginate option will be ignored.
   *
   * @see {@link https://nodejs.org/api/stream.html}
   *
   * @param {Object} request
   *   The request object that will be sent.
   * @param {string} request.parent
   *   Required. The name of the project that contains the keys that will be
   *   listed, in the format "projects/{project_number}".
   * @param {number} [request.pageSize]
   *   Optional. The maximum number of keys to return. Default is 10. Max limit is
   *   1000.
   * @param {string} [request.pageToken]
   *   Optional. The next_page_token value returned from a previous.
   *   ListKeysRequest, if any.
   * @param {object} [options]
   *   Call options. See {@link https://googleapis.dev/nodejs/google-gax/latest/interfaces/CallOptions.html|CallOptions} for more details.
   * @returns {Stream}
   *   An object stream which emits an object representing [Key]{@link google.cloud.recaptchaenterprise.v1beta1.Key} on 'data' event.
   */
  listKeysStream(
    request?: protosTypes.google.cloud.recaptchaenterprise.v1beta1.IListKeysRequest,
    options?: gax.CallOptions | {}
  ): Transform {
    request = request || {};
    const callSettings = new gax.CallSettings(options);
    return this._descriptors.page.listKeys.createStream(
      this._innerApiCalls.listKeys as gax.GaxCall,
      request,
      callSettings
    );
  }
  // --------------------
  // -- Path templates --
  // --------------------

  /**
   * Return a fully-qualified project resource name string.
   *
   * @param {string} project
   * @returns {string} Resource name string.
   */
  projectPath(project: string) {
    return this._pathTemplates.projectPathTemplate.render({
      project,
    });
  }

  /**
   * Parse the project from Project resource.
   *
   * @param {string} projectName
   *   A fully-qualified path representing Project resource.
   * @returns {string} A string representing the project.
   */
  matchProjectFromProjectName(projectName: string) {
    return this._pathTemplates.projectPathTemplate.match(projectName).project;
  }

  /**
   * Return a fully-qualified assessment resource name string.
   *
   * @param {string} project
   * @param {string} assessment
   * @returns {string} Resource name string.
   */
  assessmentPath(project: string, assessment: string) {
    return this._pathTemplates.assessmentPathTemplate.render({
      project,
      assessment,
    });
  }

  /**
   * Parse the project from Assessment resource.
   *
   * @param {string} assessmentName
   *   A fully-qualified path representing Assessment resource.
   * @returns {string} A string representing the project.
   */
  matchProjectFromAssessmentName(assessmentName: string) {
    return this._pathTemplates.assessmentPathTemplate.match(assessmentName)
      .project;
  }

  /**
   * Parse the assessment from Assessment resource.
   *
   * @param {string} assessmentName
   *   A fully-qualified path representing Assessment resource.
   * @returns {string} A string representing the assessment.
   */
  matchAssessmentFromAssessmentName(assessmentName: string) {
    return this._pathTemplates.assessmentPathTemplate.match(assessmentName)
      .assessment;
  }

  /**
   * Return a fully-qualified key resource name string.
   *
   * @param {string} project
   * @param {string} key
   * @returns {string} Resource name string.
   */
  keyPath(project: string, key: string) {
    return this._pathTemplates.keyPathTemplate.render({
      project,
      key,
    });
  }

  /**
   * Parse the project from Key resource.
   *
   * @param {string} keyName
   *   A fully-qualified path representing Key resource.
   * @returns {string} A string representing the project.
   */
  matchProjectFromKeyName(keyName: string) {
    return this._pathTemplates.keyPathTemplate.match(keyName).project;
  }

  /**
   * Parse the key from Key resource.
   *
   * @param {string} keyName
   *   A fully-qualified path representing Key resource.
   * @returns {string} A string representing the key.
   */
  matchKeyFromKeyName(keyName: string) {
    return this._pathTemplates.keyPathTemplate.match(keyName).key;
  }

  /**
   * Terminate the GRPC channel and close the client.
   *
   * The client will no longer be usable and all future behavior is undefined.
   */
  close(): Promise<void> {
    if (!this._terminated) {
      return this.recaptchaEnterpriseServiceV1Beta1Stub.then(stub => {
        this._terminated = true;
        stub.close();
      });
    }
    return Promise.resolve();
  }
}
