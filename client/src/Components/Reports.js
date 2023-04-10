import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useUser } from '../Contexts/userProvider'
import { Chart as ChartJS } from 'chart.js/auto'
import { Bar } from 'react-chartjs-2'

import data from '../utils/test.js'

function Reports(props) {
  const [vac, setVac] = useState({
    labels: data.map((data, i) => data.destination),
    datasets: [
      {
        label: 'Number of Followers',
        data: data.map((data, i) => data.followers),
      },
    ],
  })

  return (
    <div>
      <Bar data={vac} />
    </div>
  )
}

export default Reports
