import { type Meta, type StoryObj } from 'storybook-solidjs'
import Dashboard from './Index'

const meta: Meta<typeof Dashboard> = {
  component: Dashboard,
  title: 'Pages/Dashboard',
}

export default meta
type Story = StoryObj<typeof Dashboard>

export const Default: Story = {
  render: () => {
    return (
      <Dashboard
        balance="165,737.8"
        profit={-0.00114}
        percent={-2.38}
        banners={['Wallet', 'Solana', 'Sui']}
        allocation="2"
        tokenTotalBalance="55 368,9"
      />
    )
  },
}
