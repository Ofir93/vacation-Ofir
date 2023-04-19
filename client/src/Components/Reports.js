import axios from 'axios'
import React, { PureComponent } from 'react'
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink']

const TriangleBar = (props) => {
  const { fill, x, y, width, height } = props

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />
}

const getPath = (x, y, width, height) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${
    y + height / 3
  }
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
    x + width
  }, ${y + height}
    Z`
}

export default class Reports extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { data: [] }
    setInterval(this.refreshChart(), 180000)
  }

  refreshChart = () => {
    axios
      .get(`http://localhost:4000/vacations`)
      .then((res) => {
        const filtered = res.data.filter((vac) => vac.followers > 0)
        this.setState({ data: filtered })
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={this.state.data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="destination" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="followers"
            fill="#8884d8"
            shape={<TriangleBar />}
            label={{ position: 'top' }}
          >
            {this.state.data.map((dataT, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % 20]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    )
  }
}
