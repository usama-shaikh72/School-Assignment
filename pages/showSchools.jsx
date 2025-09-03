import useSWR from 'swr';
import Link from 'next/link';

const fetcher = (url) => fetch(url).then(r => r.json());

export default function ShowSchools() {
  const { data, error, isLoading } = useSWR('/api/schools', fetcher);

  return (
    <main className="container">
      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', gap:12, marginBottom:16}}>
        <h1 style={{fontSize:24}}>Schools</h1>
        <Link href="/addSchool" className="button secondary">Add School</Link>
      </div>

      {isLoading && <p>Loading...</p>}
      {error && <p className="error">Failed to load schools</p>}

      <div className="grid">
        {data && data.schools && data.schools.map((s) => (
          <article key={s.id} className="card">
            <img src={s.image ? `/schoolImages/${s.image}` : '/schoolImages/placeholder.png'} alt={s.name} />
            <div className="card-content">
              <h3 style={{margin:'4px 0 6px 0'}}>{s.name}</h3>
              <p style={{margin:0, color:'#334155'}}>{s.address}</p>
              <p style={{margin:'6px 0 0 0', color:'#475569'}}>{s.city}</p>
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}
