import { Dashboard } from '@pages/Dashboard/Index'

const DashboardRoot = () => {
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
}

export default DashboardRoot
