import { type Meta, type StoryObj } from 'storybook-solidjs'
import AssetSummary from './Index'

const meta: Meta<typeof AssetSummary> = {
  component: AssetSummary,
  title: 'Components/AssetSummary',
}

export default meta
type Story = StoryObj<typeof AssetSummary>

export const Default: Story = {
  render: () => {
    return <AssetSummary allocation="2" balance="165,737.8" />
  },
}
