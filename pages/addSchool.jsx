import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Link from 'next/link';

export default function AddSchool() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();
  const [serverMsg, setServerMsg] = useState('');

  async function onSubmit(values) {
    setServerMsg('');
    try {
      let imageFileName = '';
      if (values.image && values.image.length > 0) {
        const formData = new FormData();
        formData.append('image', values.image[0]);
        const uploadRes = await fetch('/api/upload', { method: 'POST', body: formData });
        const uploadJson = await uploadRes.json();
        if (!uploadRes.ok) throw new Error(uploadJson.error || 'Failed to upload image');
        imageFileName = uploadJson.fileName;
      }
      const payload = {
        name: values.name,
        address: values.address,
        city: values.city,
        state: values.state,
        contact: values.contact,
        email_id: values.email_id,
        image: imageFileName,
      };
      const res = await fetch('/api/schools', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed to save school');
      setServerMsg('School saved successfully ✔️');
      reset();
    } catch (err) {
      setServerMsg(err.message);
    }
  }

  return (
    <main className="container">
      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:12, marginBottom:16}}>
        <h1 style={{fontSize:24}}>Add School</h1>
        <Link href="/showSchools" className="button secondary">View Schools</Link>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" style={{background:'white', padding:16, border:'1px solid #e5e7eb', borderRadius:12}}>
        <div className="form-row">
          <div>
            <label className="label">School Name</label>
            <input className="input" placeholder="e.g., Sunshine Public School"
              {...register('name', { required: 'Name is required', minLength: { value: 2, message: 'Name too short' } })}
            />
            {errors.name && <p className="error">{errors.name.message}</p>}
          </div>

          <div>
            <label className="label">Email</label>
            <input className="input" placeholder="school@example.com"
              {...register('email_id', { 
                required: 'Email is required',
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' }
              })}
            />
            {errors.email_id && <p className="error">{errors.email_id.message}</p>}
          </div>
        </div>

        <div className="form-row">
          <div>
            <label className="label">Contact Number</label>
            <input className="input" placeholder="e.g., 9876543210"
              {...register('contact', { 
                required: 'Contact is required',
                pattern: { value: /^\d{7,15}$/, message: 'Enter 7-15 digits' }
              })}
            />
            {errors.contact && <p className="error">{errors.contact.message}</p>}
          </div>

          <div>
            <label className="label">State</label>
            <input className="input" placeholder="e.g., Maharashtra" {...register('state', { required: 'State is required' })} />
            {errors.state && <p className="error">{errors.state.message}</p>}
          </div>
        </div>

        <div>
          <label className="label">Address</label>
          <textarea className="textarea" placeholder="Street, Area"
            {...register('address', { required: 'Address is required', minLength: { value: 5, message: 'Address too short' } })}
          />
          {errors.address && <p className="error">{errors.address.message}</p>}
        </div>

        <div className="form-row">
          <div>
            <label className="label">City</label>
            <input className="input" placeholder="e.g., Pune" {...register('city', { required: 'City is required' })} />
            {errors.city && <p className="error">{errors.city.message}</p>}
          </div>

          <div>
            <label className="label">School Image</label>
            <input type="file" accept="image/*" className="input" {...register('image')} />
            <p style={{fontSize:13, color:'#475569', marginTop:6}}>Optional. JPG/PNG recommended.</p>
          </div>
        </div>

        <div style={{display:'flex', gap:10, marginTop:12}}>
          <button className="button" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Saving...' : 'Save School'}</button>
          <button className="button secondary" type="button" onClick={() => reset()}>Reset</button>
        </div>
        {serverMsg && <p className={serverMsg.includes('✔️') ? 'success' : 'error'}>{serverMsg}</p>}
      </form>
    </main>
  );
}
