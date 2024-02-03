import type { Response } from '@adonisjs/core/http'
import Application from '#models/application'
import Database from '#models/database'
import Deployment from '#models/deployment'

export default interface IDriver {
  initializeDriver(): void | Promise<void>

  applications: IDriverApplicationsService
  databases: IDriverDatabasesService
  deployments: IDriverDeploymentsService
}

export interface IDriverApplicationsService {
  createApplication(application: Application): void | Promise<void>
  deleteApplication(application: Application): void | Promise<void>
  streamLogs(
    application: Application,
    response: Response,
    scope: 'application' | 'builder'
  ): void | Promise<void>
  createCertificate(application: Application, hostname: string): void | Promise<void>
  checkDnsConfiguration(
    application: Application,
    hostname: string
  ): 'unconfigured' | 'pending' | 'configured' | Promise<'unconfigured' | 'pending' | 'configured'>
  deleteCertificate(application: Application, hostname: string): void | Promise<void>
}

export interface IDriverDatabasesService {
  createDatabase(database: Database): void | Promise<void>
  deleteDatabase(database: Database): void | Promise<void>
}

export interface IDriverDeploymentsService {
  igniteBuilder(application: Application, deployment: Deployment): void | Promise<void>
  igniteApplication(application: Application, deployment: Deployment): void | Promise<void>
}
