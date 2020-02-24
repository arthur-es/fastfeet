import 'dotenv/config';
import app from './app';

app.listen(3000, () => {
  console.log('Server listening on PORT 3000', 'http://localhost:3000');
});
