import { type Meta, type StoryObj } from 'storybook-solidjs'
import TokenInfoCard from './Index'

const meta: Meta<typeof TokenInfoCard> = {
  component: TokenInfoCard,
  title: 'Components/TokenInfoCard',
}
export default meta
type Story = StoryObj<typeof TokenInfoCard>

export const Default: Story = {
  render: () => {
    return (
      <div class="m-[20px] flex flex-col gap-[1px] w-full">
        <TokenInfoCard label="Label" description="Description" isFirst={true} />
        <TokenInfoCard label="Label" description="Description" isFirst={false} />
      </div>
    )
  },
}

export const LongList: Story = {
  render: () => {
    return (
      <div class="m-[20px] flex flex-col gap-[1px] w-full">
        <TokenInfoCard label="Label" description="Description" isFirst={true} />
        <TokenInfoCard label="Label" description="Description" />
        <TokenInfoCard label="Label" description="Description" />
        <TokenInfoCard label="Label" description="Description" />
        <TokenInfoCard label="Label" description="Description" />
        <TokenInfoCard label="Label" description="Description" isFirst={false} />
      </div>
    )
  },
}
