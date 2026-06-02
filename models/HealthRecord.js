const mongoose = require('mongoose');

const healthRecordSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  category: { type: String, default: 'General' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('HealthRecord', healthRecordSchema);
