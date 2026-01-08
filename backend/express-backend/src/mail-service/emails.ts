import { SendEmailCommand } from "@aws-sdk/client-ses";
import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
} from "./emailTemplate.js";
import { sesClient, sender } from "./ses.config.js";

export const sendVerificationEmail = async (
  email: string,
  verificationToken: string
): Promise<void> => {
  const params = {
    Source: `${sender.name} <${sender.email}>`,
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Subject: {
        Data: "Verify your email",
      },
      Body: {
        Html: {
          Data: VERIFICATION_EMAIL_TEMPLATE.replace(
            "{verificationCode}",
            verificationToken
          ),
          Charset: "UTF-8",
        },
      },
    },
  };

  try {
    const command = new SendEmailCommand(params);
    const response = await sesClient.send(command);
    console.log("Verification email sent successfully:", response);
  } catch (error: any) {
    console.error("Error sending verification email:", error);
    throw new Error(`Failed to send verification email: ${error.message}`);
  }
};


export const sendWelcomeEmail = async (
  email: string,
  name: string
): Promise<void> => {
  const welcomeTemplate = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Welcome</title>
    </head>
    <body>
        <h1>Welcome, ${name}!</h1>
        <p>Thank you for joining us. We're excited to have you on board!</p>
    </body>
    </html>
  `;

  const params = {
    Source: `${sender.name} <${sender.email}>`,
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Subject: {
        Data: "Welcome!",
        Charset: "UTF-8",
      },
      Body: {
        Html: {
          Data: welcomeTemplate,
          Charset: "UTF-8",
        },
      },
    },
  };

  try {
    const command = new SendEmailCommand(params);
    const response = await sesClient.send(command);
    console.log("Welcome email sent successfully:", response);
  } catch (error: any) {
    console.error("Error sending welcome email:", error);
    throw new Error(`Failed to send welcome email: ${error.message}`);
  }
};



export const sendPasswordResetEmail = async (
  email: string,
  resetURL: string
): Promise<void> => {
  const params = {
    Source: `${sender.name} <${sender.email}>`,
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Subject: {
        Data: "Reset your password",
        Charset: "UTF-8",
      },
      Body: {
        Html: {
          Data: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
          Charset: "UTF-8",
        },
      },
    },
  };

  try {
    const command = new SendEmailCommand(params);
    const response = await sesClient.send(command);
    console.log("Password reset email sent successfully:", response);
  } catch (error: any) {
    console.error("Error sending password reset email:", error);
    throw new Error(`Failed to send password reset email: ${error.message}`);
  }
};



export const sendResetSuccessEmail = async (email: string): Promise<void> => {
  const params = {
    Source: `${sender.name} <${sender.email}>`,
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Subject: {
        Data: "Password reset successful",
        Charset: "UTF-8",
      },
      Body: {
        Html: {
          Data: PASSWORD_RESET_SUCCESS_TEMPLATE,
          Charset: "UTF-8",
        },
      },
    },
  };

  try {
    const command = new SendEmailCommand(params);
    const response = await sesClient.send(command);
    console.log("Password reset success email sent successfully:", response);
  } catch (error: any) {
    console.error("Error sending password reset success email:", error);
    throw new Error(`Failed to send password reset success email: ${error.message}`);
  }
};
