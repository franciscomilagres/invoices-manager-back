import express from 'express';
import healthRouter from './routes/health';
import customerRouter from './routes/customers'

const app = express();

app.use(express.json());

app.use('/api/health', healthRouter);
app.use('/api/customers', customerRouter);

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export default app;