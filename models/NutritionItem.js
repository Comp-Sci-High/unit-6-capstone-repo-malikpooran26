const mongoose = require('mongoose');

const nutritionItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  calories: { type: Number, default: 0 },
  protein: { type: Number, default: 0 },
  carbs: { type: Number, default: 0 },
  fat: { type: Number, default: 0 },
  notes: { type: String, default: '' },
  category: { type: String, default: 'Nutrition' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('NutritionItem', nutritionItemSchema);
