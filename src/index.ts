import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectToDatabase } from './config/db';
import { scheduler } from './cron/schedule';
import storeSettingRoutes from './routes/storeSetting';
import authIntegrationRoutes from './routes/auth0';
import path from 'path';
import session from 'express-session';
import { auth } from 'express-openid-connect';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const DB_URI = process.env.DATABASE_URL || 'mongodb://localhost:27017/level-chart';

app.use(
  session({
    secret: process.env.ENCRYPTION_KEY || "level-chart-secret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } 
  })
);

app.use(cors());
app.use(express.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_SECRET,
  baseURL: process.env.AUTH0_BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
};

app.use(auth(config));

app.use(function (req, res, next) {
  res.locals.user = req.oidc.user;
  next();
});

app.use('/', authIntegrationRoutes);

// API Route 
app.get('/api', async (req: Request, res: Response) => {
  try {
    res.json({
      shopInfo: { currency: 'USD', location: 'Sample Location' },
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to fetch data');
  }
});

app.use('/api/store-settings', storeSettingRoutes);

scheduler()

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
  connectToDatabase(DB_URI);
});
