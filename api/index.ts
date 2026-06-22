import express from 'express';
import healthRouter from './routes/health';

const app = express();

app.use(express.json());

app.use('/api/health', healthRouter);

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export default app;