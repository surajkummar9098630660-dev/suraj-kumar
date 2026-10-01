export default function Revenue({ vehicles }){
  const revenueData = [
    { month: 'Apr', amount: 42000 },
    { month: 'May', amount: 58000 },
    { month: 'Jun', amount: 45000 },
    { month: 'Jul', amount: 72000 },
    { month: 'Aug', amount: 68000 },
    { month: 'Sep', amount: 89000 },
  ]
  const maxAmount = Math.max(...revenueData.map(r => r.amount))

  const transactions = [
    { id: '#TXN-101', vehicle: 'Truck-101', route: 'Patna → Gaya', amount: '₹12,500', status: 'Paid', date: '24 Sep' },
    { id: '#TXN-102', vehicle: 'Van-201', route: 'Soh Sarai → Bihar Sharif', amount: '₹4,200', status: 'Paid', date: '23 Sep' },
    { id: '#TXN-103', vehicle: 'Truck-102', route: 'Patna → Muzaffarpur', amount: '₹8,900', status: 'Pending', date: '23 Sep' },
    { id: '#TXN-104', vehicle: 'Truck-101', route: 'Gaya → Patna', amount: '₹11,000', status: 'Paid', date: '22 Sep' },
  ]

  return (
    <div>
      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginTop: '20px' }}>
        <div className="card"><div style={{ fontSize: '11px', color: '#888' }}>TOTAL REVENUE</div><div style={{ fontSize: '22px', fontWeight: '800', marginTop: '6px' }}>₹3,74,000</div><div style={{ fontSize: '11px', color: '#22c55e', marginTop: '4px' }}>↑ 12.5% vs last month</div></div>
        <div className="card"><div style={{ fontSize: '11px', color: '#888' }}>THIS MONTH</div><div style={{ fontSize: '22px', fontWeight: '800', marginTop: '6px' }}>₹89,000</div><div style={{ fontSize: '11px', color: '#22c55e', marginTop: '4px' }}>● 18 trips completed</div></div>
        <div className="card"><div style={{ fontSize: '11px', color: '#888' }}>PENDING</div><div style={{ fontSize: '22px', fontWeight: '800', marginTop: '6px', color: '#f59e0b' }}>₹8,900</div><div style={{ fontSize: '11px', color: '#888', marginTop: '4px' }}>1 invoice</div></div>
        <div className="card"><div style={{ fontSize: '11px', color: '#888' }}>EXPENSES</div><div style={{ fontSize: '22px', fontWeight: '800', marginTop: '6px', color: '#ef4444' }}>₹32,400</div><div style={{ fontSize: '11px', color: '#888', marginTop: '4px' }}>Fuel + Maintenance</div></div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '14px', marginTop: '14px' }}>
        {/* Chart */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div style={{ fontWeight: '700' }}>Revenue Growth</div>
            <div style={{ fontSize: '11px', background: '#1a1a1a', padding: '4px 8px', borderRadius: '6px' }}>Last 6 Months</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', height: '140px' }}>
            {revenueData.map((r,i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <div style={{ fontSize: '10px', color: '#888' }}>₹{r.amount/1000}k</div>
                <div style={{ width: '100%', height: `${(r.amount/maxAmount)*120}px`, background: i===5? 'white' : '#1f1f1f', borderRadius: '6px', transition: '0.3s' }}></div>
                <div style={{ fontSize: '11px', color: i===5? 'white' : '#666', fontWeight: i===5? '700' : '400' }}>{r.month}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Vehicle */}
        <div className="card">
          <div style={{ fontWeight: '700', marginBottom: '16px' }}>Top Earning Vehicle</div>
          <div style={{ textAlign: 'center', padding: '10px 0' }}>
            <div style={{ width: '60px', height: '60px', background: '#1a1a1a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', fontSize: '24px' }}>🚚</div>
            <div style={{ fontWeight: '800', marginTop: '10px' }}>Truck-101</div>
            <div style={{ fontSize: '12px', color: '#888' }}>Amit • 47 trips</div>
            <div style={{ fontSize: '20px', fontWeight: '800', marginTop: '12px', color: '#22c55e' }}>₹1,24,500</div>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="card" style={{ marginTop: '14px' }}>
        <div style={{ fontWeight: '700', marginBottom: '14px' }}>Recent Transactions</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr 1fr 1fr 1fr', fontSize: '11px', color: '#666', paddingBottom: '10px', borderBottom: '1px solid #222' }}>
          <div>ID</div><div>VEHICLE</div><div>ROUTE</div><div>AMOUNT</div><div>STATUS</div><div>DATE</div>
        </div>
        {transactions.map(t => (
          <div key={t.id} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 2fr 1fr 1fr 1fr', padding: '14px 0', borderBottom: '1px solid #141414', fontSize: '13px', alignItems: 'center' }}>
            <div style={{ color: '#888', fontSize: '12px' }}>{t.id}</div>
            <div>{t.vehicle}</div>
            <div style={{ color: '#888' }}>{t.route}</div>
            <div style={{ fontWeight: '700' }}>{t.amount}</div>
            <div><span style={{ background: t.status==='Paid'? '#052e16' : '#422006', color: t.status==='Paid'? '#22c55e' : '#f59e0b', padding: '4px 8px', borderRadius: '6px', fontSize: '11px' }}>{t.status}</span></div>
            <div style={{ color: '#666', fontSize: '12px' }}>{t.date}</div>
          </div>
        ))}
      </div>
    </div>
  )
}