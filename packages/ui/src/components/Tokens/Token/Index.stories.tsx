import { type Meta, type StoryObj } from 'storybook-solidjs'
import Token from './Index'

const meta: Meta<typeof Token> = {
  component: Token,
  title: 'Pages/Tokens/Token',
}

export default meta
type Story = StoryObj<typeof Token>

export const Default: Story = {
  render: () => {
    return (
      <Token
        label="CLOUD"
        address=" 4abDc4abDc4abDc4abDc4abDc4abDc4abDc4abDc"
        balance="3,596"
        price="3,596"
        value="9,226.82"
      />
    )
  },
}
