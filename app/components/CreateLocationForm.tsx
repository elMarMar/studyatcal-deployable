"use client"
import React, { useState } from 'react'


const CreateLocationForm = () => {
  const [form, setForm] = useState({
    id: '',
    name: '',
    location: '',
    image_url: '',
    google_maps_url: '',
    has_desk: false,
    has_sofa: false,
    can_purchase_food_drinks: false,
    allows_drinks: false,
    allows_food: false,
    noise_level: '',
    group_friendly: false,
    solo_friendly: false,
    has_outlets: false,
    current_busyness: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await fetch('/api/location/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Failed to create location');
      setSuccess('Location created!');
      setForm({
        id: '', name: '', location: '', image_url: '', google_maps_url: '',
        has_desk: false, has_sofa: false, can_purchase_food_drinks: false, allows_drinks: false, allows_food: false,
        noise_level: '', group_friendly: false, solo_friendly: false, has_outlets: false, current_busyness: 0,
      });
    } catch (err: any) {
      setError(err.message || 'Error creating location');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <form className="space-y-4" onSubmit={handleSubmit}>
        {error && <div className="text-red-600 text-sm text-center">{error}</div>}
        {success && <div className="text-green-600 text-sm text-center">{success}</div>}
        <div>
          <label htmlFor="id" className="block text-sm font-medium text-gray-700">ID</label>
          <input type="text" id="id" name="id" className="mt-1 block w-full border border-gray-300 rounded px-3 py-2" value={form.id} onChange={handleChange} disabled={loading} required />
        </div>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" id="name" name="name" className="mt-1 block w-full border border-gray-300 rounded px-3 py-2" value={form.name} onChange={handleChange} disabled={loading} />
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">Campus Location</label>
            <select
              id="location"
              name="location"
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
              value={form.location}
              onChange={handleChange}
              disabled={loading}
              required
            >
              <option value="">Select a campus area</option>
              <option value="on campus">On Campus</option>
              <option value="north campus">North Campus</option>
              <option value="south campus">South Campus</option>
              <option value="downtown">Downtown</option>
            </select>
          </div>
          <div>
            <label htmlFor="image_url" className="block text-sm font-medium text-gray-700">Image URL</label>
            <input type="text" id="image_url" name="image_url" className="mt-1 block w-full border border-gray-300 rounded px-3 py-2" value={form.image_url} onChange={handleChange} disabled={loading} />
          </div>
          <div>
            <label htmlFor="google_maps_url" className="block text-sm font-medium text-gray-700">Google Maps URL</label>
            <input type="text" id="google_maps_url" name="google_maps_url" className="mt-1 block w-full border border-gray-300 rounded px-3 py-2" value={form.google_maps_url} onChange={handleChange} disabled={loading} />
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="has_desk" name="has_desk" className="mr-2" checked={form.has_desk} onChange={handleChange} disabled={loading} />
            <label htmlFor="has_desk" className="text-sm text-gray-700">Has Desk</label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="has_sofa" name="has_sofa" className="mr-2" checked={form.has_sofa} onChange={handleChange} disabled={loading} />
            <label htmlFor="has_sofa" className="text-sm text-gray-700">Has Sofa</label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="can_purchase_food_drinks" name="can_purchase_food_drinks" className="mr-2" checked={form.can_purchase_food_drinks} onChange={handleChange} disabled={loading} />
            <label htmlFor="can_purchase_food_drinks" className="text-sm text-gray-700">Can Purchase Food/Drinks</label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="allows_drinks" name="allows_drinks" className="mr-2" checked={form.allows_drinks} onChange={handleChange} disabled={loading} />
            <label htmlFor="allows_drinks" className="text-sm text-gray-700">Allows Drinks</label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="allows_food" name="allows_food" className="mr-2" checked={form.allows_food} onChange={handleChange} disabled={loading} />
            <label htmlFor="allows_food" className="text-sm text-gray-700">Allows Food</label>
          </div>
          <div>
            <label htmlFor="noise_level" className="block text-sm font-medium text-gray-700">Noise Level</label>
            <select
              id="noise_level"
              name="noise_level"
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
              value={form.noise_level}
              onChange={handleChange}
              disabled={loading}
              required
            >
              <option value="">Select noise level</option>
              <option value="quiet">Quiet</option>
              <option value="loud">Loud</option>
            </select>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="group_friendly" name="group_friendly" className="mr-2" checked={form.group_friendly} onChange={handleChange} disabled={loading} />
            <label htmlFor="group_friendly" className="text-sm text-gray-700">Group Friendly</label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="solo_friendly" name="solo_friendly" className="mr-2" checked={form.solo_friendly} onChange={handleChange} disabled={loading} />
            <label htmlFor="solo_friendly" className="text-sm text-gray-700">Solo Friendly</label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="has_outlets" name="has_outlets" className="mr-2" checked={form.has_outlets} onChange={handleChange} disabled={loading} />
            <label htmlFor="has_outlets" className="text-sm text-gray-700">Has Outlets</label>
          </div>
          <div>
            <label htmlFor="current_busyness" className="block text-sm font-medium text-gray-700">Current Busyness (optional)</label>
            <input type="text" id="current_busyness" name="current_busyness" className="mt-1 block w-full border border-gray-300 rounded px-3 py-2" placeholder="e.g. 0, 1, 2, etc..." value={form.current_busyness} onChange={handleChange} disabled={loading} />
          </div>
          <button type="submit" className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 transition" disabled={loading}>
            {loading ? 'Creating...' : 'Create Location'}
          </button>
        </form>
      </div>
  )
}

export default CreateLocationForm
