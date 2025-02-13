import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema({
  section: { type: String, required: true }, // Identifiant de la section (ex: "parcours")
  content: { type: String, required: true }, // Contenu HTML ou texte
  lastModified: { type: Date, default: Date.now }
});

export default mongoose.model('Content', contentSchema);
