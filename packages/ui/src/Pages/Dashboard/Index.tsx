import theme from '@common/theme'
import AssetSummary from '@components/AssetSummary/Index'
import Banner from '@components/Banner/Index'
import IconButton from '@components/buttons/IconButton/Index'
import PortfolioBalance from '@components/PortfolioBalance/Index'
import Typography from '@components/Typography/Index'
import { RiArrowsArrowDownSLine } from 'solid-icons/ri'
import { Component, createSignal, For } from 'solid-js'
import { FILTERS } from '@static/index'
import Token from '@components/Token/Index'

export interface IProps {
  balance: string
  profit: number
  percent: number
  banners: string[]
  allocation: string
  tokenTotalBalance: string
}

export const Dashboard: Component<IProps> = (props) => {
  const [sortMethod, setSortMethod] = createSignal(
    FILTERS.reduce((acc: Record<string, boolean>, el) => {
      acc[el] = false
      return acc
    }, {})
  )

  return (
    <div class="flex flex-col gap-24 pr-16">
      <div class="flex flex-col gap-6">
        <Typography text="captionMedium" color="white">
          Net worth:
        </Typography>
        <PortfolioBalance balance={props.balance} profit={props.profit} percent={props.percent} />
      </div>
      <div class="flex flex-col gap-12">
        <AssetSummary allocation={props.allocation} balance={props.tokenTotalBalance} />
        <div class="flex flex-col gap-12 bg-black-400 p-12 border border-solid rounded-6 border-black-300">
          <div class="flex flex-row gap-6">
            <For each={props.banners}>{(label) => <Banner label={label} />}</For>
          </div>
          <div class="grid grid-cols-4 gap-6 px-12">
            <For each={FILTERS}>
              {(filter, index) => (
                <div
                  class="flex"
                  classList={{
                    'justify-start': index() === 0,
                    'justify-end': index() !== 0,
                  }}>
                  <div class="w-[auto]">
                    <IconButton
                      reverse
                      styles="bg-black-400 gap-6 w-[auto] outline-none  p-[0px]"
                      title={filter}
                      color="white"
                      onClick={() => {
                        setSortMethod(() => ({
                          ...sortMethod(),
                          [filter]: !sortMethod()[filter],
                        }))
                      }}>
                      <RiArrowsArrowDownSLine
                        class="transition-rotate duration-[250ms]"
                        color={theme.colors.white[100]}
                        size={24}
                        classList={{
                          'rotate-0': !sortMethod()[filter],
                          'rotate-180': sortMethod()[filter],
                        }}
                      />
                    </IconButton>
                  </div>
                </div>
              )}
            </For>
          </div>
          <div>
            <Token
              label="CLOUD"
              address=" 4abDc4abDc4abDc4abDc4abDc4abDc4abDc4abDc"
              balance="3,596"
              price="3,596"
              value="9,226.82"
            />
            <Token
              label="CLOUD"
              address=" 4abDc4abDc4abDc4abDc4abDc4abDc4abDc4abDc"
              balance="3,596"
              price="3,596"
              value="9,226.82"
            />
            <Token
              label="CLOUD"
              address=" 4abDc4abDc4abDc4abDc4abDc4abDc4abDc4abDc"
              balance="3,596"
              price="3,596"
              value="9,226.82"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
