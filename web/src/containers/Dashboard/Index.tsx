import { BLOCKCHAIN } from '@interfaces/enums'
import { Dashboard } from '@pages/Dashboard/Index'

const staticToken = {
  img: 'https://img.daisyui.com/images/profile/demo/2@94.webp',
  address: '4abDc4abDc4abDc4abDc',
  label: 'SOL',
}

const data = {
  chain: BLOCKCHAIN.SOLANA,
  tokens: [staticToken, staticToken, staticToken],
}

const DashboardRoot = () => {
  return (
    <Dashboard
      balance="165,737.8"
      profit={-0.00114}
      percent={-2.38}
      banners={['Wallet', 'Solana', 'Sui']}
      username="Luckmer"
      prices={{
        ['4abDc4abDc4abDc4abDc']: {
          totalBalance: '27684,45',
          value: '9,226.82',
          balance: '3,596',
          price: '3,596',
        },
      }}
      totalBalance={{
        [BLOCKCHAIN.SOLANA]: '55368,9',
        [BLOCKCHAIN.UNKNOWN]: '55368,9',
      }}
      data={[data, data, data]}
    />
  )
}

export default DashboardRoot
