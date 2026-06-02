const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb+srv://SE12:CSH2026@cluster0.tf3jmpg.mongodb.net/Malik?appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('public'));
app.use(express.json());

const HealthRecord = require('./models/HealthRecord');
const NutritionItem = require('./models/NutritionItem');
const Video = require('./models/Video');

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/videos', (req, res) => {
  res.render('videos');
});

app.get('/nutrition', (req, res) => {
  res.render('nutrition');
});

app.get('/health', (req, res) => {
  res.render('health');
});

// API routes for CRUD operations
app.get('/api/health-records', async (req, res) => {
  try {
    const records = await HealthRecord.find();
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch health records' });
  }
});

app.post('/api/health-records', async (req, res) => {
  try {
    const record = new HealthRecord(req.body);
    await record.save();
    res.status(201).json(record);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create health record', details: err.message });
  }
});

app.get('/api/health-records/:id', async (req, res) => {
  try {
    const record = await HealthRecord.findById(req.params.id);
    if (!record) {
      return res.status(404).json({ error: 'Health record not found' });
    }
    res.json(record);
  } catch (err) {
    res.status(400).json({ error: 'Invalid record ID' });
  }
});

app.put('/api/health-records/:id', async (req, res) => {
  try {
    const record = await HealthRecord.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!record) {
      return res.status(404).json({ error: 'Health record not found' });
    }
    res.json(record);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update health record', details: err.message });
  }
});

app.delete('/api/health-records/:id', async (req, res) => {
  try {
    const record = await HealthRecord.findByIdAndDelete(req.params.id);
    if (!record) {
      return res.status(404).json({ error: 'Health record not found' });
    }
    res.json({ message: 'Health record deleted' });
  } catch (err) {
    res.status(400).json({ error: 'Invalid record ID' });
  }
});

// CRUD routes for nutrition items
app.get('/api/nutrition-items', async (req, res) => {
  try {
    const items = await NutritionItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch nutrition items' });
  }
});

app.post('/api/nutrition-items', async (req, res) => {
  try {
    const item = new NutritionItem(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create nutrition item', details: err.message });
  }
});

app.get('/api/nutrition-items/:id', async (req, res) => {
  try {
    const item = await NutritionItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Nutrition item not found' });
    }
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: 'Invalid item ID' });
  }
});

app.put('/api/nutrition-items/:id', async (req, res) => {
  try {
    const item = await NutritionItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!item) {
      return res.status(404).json({ error: 'Nutrition item not found' });
    }
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update nutrition item', details: err.message });
  }
});

app.delete('/api/nutrition-items/:id', async (req, res) => {
  try {
    const item = await NutritionItem.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Nutrition item not found' });
    }
    res.json({ message: 'Nutrition item deleted' });
  } catch (err) {
    res.status(400).json({ error: 'Invalid item ID' });
  }
});

// CRUD routes for videos
app.get('/api/videos', async (req, res) => {
  try {
    const videos = await Video.find();
    res.json(videos);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch videos' });
  }
});

app.post('/api/videos', async (req, res) => {
  try {
    const video = new Video(req.body);
    await video.save();
    res.status(201).json(video);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create video', details: err.message });
  }
});

app.get('/api/videos/:id', async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ error: 'Video not found' });
    }
    res.json(video);
  } catch (err) {
    res.status(400).json({ error: 'Invalid video ID' });
  }
});

app.put('/api/videos/:id', async (req, res) => {
  try {
    const video = await Video.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!video) {
      return res.status(404).json({ error: 'Video not found' });
    }
    res.json(video);
  } catch (err) {
    res.status(400).json({ error: 'Failed to update video', details: err.message });
  }
});

app.delete('/api/videos/:id', async (req, res) => {
  try {
    const video = await Video.findByIdAndDelete(req.params.id);
    if (!video) {
      return res.status(404).json({ error: 'Video not found' });
    }
    res.json({ message: 'Video deleted' });
  } catch (err) {
    res.status(400).json({ error: 'Invalid video ID' });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});