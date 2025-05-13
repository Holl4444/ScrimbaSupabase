import supabase from './supabase-client';
import { useEffect } from 'react';

function Dashboard() {

    useEffect(() => fetchMetrics, [])

    async function fetchMetrics() {
      const response = await supabase
      .from('sales_deals')
      .select(
        `
        name,
        value.sum()
        `,
      )
        
        console.log(response);

      return (
        <div className="dashboard-wrapper">
          <div className="chart-container">
            <h2>Total Sales This Quarter ($)</h2>
          </div>
        </div>
      );
    }

  }
  
  export default Dashboard;