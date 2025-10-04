import nodemailer from 'nodemailer';
import CONFIG from '#config/config.js';
import fs from 'fs/promises';
import path from 'path';
import hbs from 'nodemailer-express-handlebars';

const transport = nodemailer.createTransport({
  host: CONFIG.MAIL_HOST,
  port: CONFIG.MAIL_PORT,
  auth: {
    user: CONFIG.MAIL_USER,
    pass: CONFIG.MAIL_PASS,
  },
});

export default transport;

const layoutsPath = path.resolve(`src/mails/layouts`);
const partialsPath = path.resolve(`src/mails/partials`);
const viewPath = path.resolve(`src/mails`);

transport.use('compile', hbs({
  viewEngine: {
    extname: '.hbs',
    layoutsDir: layoutsPath,
    partialsDir: partialsPath,
    defaultLayout: false, 
  },
  viewPath: viewPath,
  extName: '.hbs',
}));

export const sendEmail = async ({ to, subject, feature, template, context }) => {

  try {
    await transport.sendMail({
      from: CONFIG.MAIL_FROM,
      to,
      subject,
      template,
      context,
    });
  } catch (error) {
    console.error('Error sending mail: ', error);
    throw error;
  }
};

export const readFileContent = async (relativeFilePath) => {
  const fullPath = path.join(process.cwd(), relativeFilePath);
  try {
    return await fs.readFile(fullPath, 'utf8');
  } catch (error) {
    console.error(`Error leyendo archivo ${fullPath}:`, error);
    throw error;
  }
};