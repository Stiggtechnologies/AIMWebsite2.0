import nodemailer from 'nodemailer';

export const DEFAULT_CLINIC_NOTIFICATION_ADDRESS = 'websiteleads@aimphysiotherapy.ca';
export const DEFAULT_CLINIC_SMTP_HOST = 'mail.aimphysiotherapy.ca';
export const DEFAULT_CLINIC_SMTP_PORT = 465;
export const DEFAULT_CLINIC_SMTP_USER = 'websiteleads@aimphysiotherapy.ca';

type EmailEnvironment = Record<string, string | undefined>;

export interface ClinicEmailMessage {
  subject: string;
  html: string;
  replyTo?: string | null;
  to?: string[];
  from?: string;
}

export interface ClinicSmtpConfig {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  password: string;
}

export function clinicMailboxRecipients(
  configured = process.env.CLINIC_NOTIFICATION_EMAIL
    || process.env.AIM_PERFORMANCE_ADMIN_EMAIL
    || DEFAULT_CLINIC_NOTIFICATION_ADDRESS,
): string[] {
  return configured
    .split(',')
    .map((email) => email.trim())
    .filter(Boolean);
}

export function clinicSmtpConfig(
  environment: EmailEnvironment = process.env,
): ClinicSmtpConfig {
  const host = environment.CLINIC_SMTP_HOST?.trim() || DEFAULT_CLINIC_SMTP_HOST;
  const user = environment.CLINIC_SMTP_USER?.trim() || DEFAULT_CLINIC_SMTP_USER;
  const password = environment.CLINIC_SMTP_PASSWORD;
  const rawPort = environment.CLINIC_SMTP_PORT?.trim();
  const port = rawPort ? Number(rawPort) : DEFAULT_CLINIC_SMTP_PORT;

  if (!password) {
    throw new Error('CLINIC_SMTP_PASSWORD is not configured');
  }
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('CLINIC_SMTP_PORT must be a valid TCP port');
  }

  const rawSecure = environment.CLINIC_SMTP_SECURE?.trim().toLowerCase();
  if (rawSecure && rawSecure !== 'true' && rawSecure !== 'false') {
    throw new Error('CLINIC_SMTP_SECURE must be true or false');
  }

  return {
    host,
    port,
    secure: rawSecure ? rawSecure === 'true' : port === 465,
    user,
    password,
  };
}

export async function sendClinicEmail(message: ClinicEmailMessage): Promise<void> {
  const config = clinicSmtpConfig();
  const to = message.to || clinicMailboxRecipients();
  if (to.length === 0) throw new Error('Clinic mailbox is not configured');

  const transport = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.password,
    },
    tls: {
      minVersion: 'TLSv1.2',
    },
  });

  await transport.sendMail({
    from: message.from
      || process.env.CLINIC_NOTIFICATION_FROM
      || `AIM Website <${config.user}>`,
    to,
    ...(message.replyTo ? { replyTo: message.replyTo } : {}),
    subject: message.subject,
    html: message.html,
  });
}
