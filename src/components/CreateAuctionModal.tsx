import React, { useState } from 'react';
import { BikeCategory } from '../types';
import { X, Plus, Trash2, CheckCircle2 } from 'lucide-react';

interface CreateAuctionModalProps {
  onClose: () => void;
  onCreate: (auctionData: any) => Promise<void>;
}

export const CreateAuctionModal: React.FC<CreateAuctionModalProps> = ({ onClose, onCreate }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<BikeCategory>('Sport');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState(2023);
  const [vin, setVin] = useState('');
  const [odometerMiles, setOdometerMiles] = useState(2500);
  const [engineCc, setEngineCc] = useState(1000);
  const [transmission, setTransmission] = useState('6-Speed');
  const [titleStatus, setTitleStatus] = useState<'Clean' | 'Rebuilt' | 'Salvage' | 'Lien'>('Clean');
  const [location, setLocation] = useState('Austin, TX');

  const [startingBid, setStartingBid] = useState(10000);
  const [reservePrice, setReservePrice] = useState(12000);
  const [buyItNowPrice, setBuyItNowPrice] = useState(15000);
  const [durationDays, setDurationDays] = useState(3);

  const [images, setImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80'
  ]);
  const [newImageUrl, setNewImageUrl] = useState('');

  const [modifications, setModifications] = useState<string[]>(['Custom Performance Exhaust']);
  const [newMod, setNewMod] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddImage = () => {
    if (newImageUrl.trim()) {
      setImages([...images, newImageUrl.trim()]);
      setNewImageUrl('');
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleAddMod = () => {
    if (newMod.trim()) {
      setModifications([...modifications, newMod.trim()]);
      setNewMod('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !vin || !make || !model) {
      setError('Please complete all required motorcycle specifications.');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      await onCreate({
        title,
        category,
        spec: {
          vin,
          make,
          model,
          year,
          odometerMiles,
          engineCc,
          transmission,
          titleStatus,
          frameCondition: 'Excellent',
          modifications,
          serviceHistory: ['Fresh full fluids and inspection clear'],
          location,
          sellerNotes: 'Maintained meticulously. Clean title.'
        },
        images,
        startingBid,
        reservePrice,
        buyItNowPrice: buyItNowPrice > 0 ? buyItNowPrice : undefined,
        durationDays
      });

      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to create listing');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-b border-slate-800">
          <h2 className="text-lg font-extrabold text-white">List Motorcycle for Auction</h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white bg-slate-800 rounded-xl">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 text-xs text-slate-200">
          
          {error && (
            <div className="p-3 bg-rose-950/80 text-rose-300 rounded-xl border border-rose-500/40">
              {error}
            </div>
          )}

          {/* Title & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-slate-400 mb-1 font-medium">Listing Title *</label>
              <input
                type="text"
                placeholder="e.g. 2023 Ducati Panigale V4 S - Low Miles"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-medium focus:border-amber-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1 font-medium">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as BikeCategory)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:border-amber-500 outline-none"
              >
                <option value="Sport">Sport</option>
                <option value="Cruiser">Cruiser</option>
                <option value="Adventure">Adventure</option>
                <option value="Cafe Racer">Cafe Racer</option>
                <option value="Vintage">Vintage</option>
                <option value="Naked">Naked</option>
                <option value="Touring">Touring</option>
              </select>
            </div>
          </div>

          {/* Spec details */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-950 rounded-2xl border border-slate-800">
            <div>
              <label className="block text-slate-400 mb-1">Make *</label>
              <input
                type="text"
                placeholder="Ducati"
                value={make}
                onChange={(e) => setMake(e.target.value)}
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Model *</label>
              <input
                type="text"
                placeholder="Panigale V4 S"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Year *</label>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">VIN Number *</label>
              <input
                type="text"
                placeholder="ZDM121AA9NB019283"
                value={vin}
                onChange={(e) => setVin(e.target.value)}
                required
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Odometer (mi)</label>
              <input
                type="number"
                value={odometerMiles}
                onChange={(e) => setOdometerMiles(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Engine Size (cc)</label>
              <input
                type="number"
                value={engineCc}
                onChange={(e) => setEngineCc(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Title Status</label>
              <select
                value={titleStatus}
                onChange={(e) => setTitleStatus(e.target.value as any)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white"
              >
                <option value="Clean">Clean</option>
                <option value="Rebuilt">Rebuilt</option>
                <option value="Salvage">Salvage</option>
                <option value="Lien">Lien</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1.5 text-white"
              />
            </div>
          </div>

          {/* Pricing Setup */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-4 bg-slate-950 rounded-2xl border border-slate-800">
            <div>
              <label className="block text-slate-400 mb-1">Starting Bid ($)</label>
              <input
                type="number"
                value={startingBid}
                onChange={(e) => setStartingBid(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-amber-400 font-bold font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Reserve Price ($)</label>
              <input
                type="number"
                value={reservePrice}
                onChange={(e) => setReservePrice(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-amber-400 font-bold font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Buy-It-Now ($)</label>
              <input
                type="number"
                value={buyItNowPrice}
                onChange={(e) => setBuyItNowPrice(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-amber-400 font-bold font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-400 mb-1">Auction Duration</label>
              <select
                value={durationDays}
                onChange={(e) => setDurationDays(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white"
              >
                <option value={1}>1 Day</option>
                <option value={3}>3 Days</option>
                <option value={5}>5 Days</option>
                <option value={7}>7 Days</option>
              </select>
            </div>
          </div>

          {/* Image URLs Manager */}
          <div className="space-y-2">
            <label className="block text-slate-400 font-medium">Image URLs</label>
            <div className="flex gap-2">
              <input
                type="url"
                placeholder="Paste Image URL (https://...)"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white"
              />
              <button
                type="button"
                onClick={handleAddImage}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl flex items-center gap-1"
              >
                <Plus className="w-4 h-4" /> Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {images.map((img, i) => (
                <div key={i} className="relative group w-20 h-14 rounded-lg overflow-hidden border border-slate-800">
                  <img src={img} alt={`Preview ${i}`} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(i)}
                    className="absolute inset-0 bg-rose-950/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm rounded-xl transition-colors shadow-lg"
          >
            {isSubmitting ? 'Publishing Auction...' : 'Publish Live Auction'}
          </button>

        </form>

      </div>
    </div>
  );
};
