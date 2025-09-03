import Link from 'next/link';

export default function Home() {
  return (
    <main style={{minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', padding:20}}>
      <div style={{maxWidth:700, width:'100%'}}>
        <h1 style={{fontSize:28, marginBottom:12}}>School Directory</h1>
        <p style={{marginBottom:24}}>Use the links below to add schools and view the list.</p>
        <div style={{display:'flex', gap:12, flexWrap:'wrap'}}>
          <Link href="/addSchool" style={btnStyle}>Add School</Link>
          <Link href="/showSchools" style={btnStyle}>Show Schools</Link>
        </div>
      </div>
    </main>
  )
}

const btnStyle = {
  padding:'12px 16px',
  borderRadius:10,
  border:'1px solid #e5e7eb',
  textDecoration:'none'
};
