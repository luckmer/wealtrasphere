import AssetSummary from '@components/AssetSummary/Index'
import PortfolioBalance from '@components/PortfolioBalance/Index'
import Typography from '@components/Typography/Index'
import { BLOCKCHAIN } from '@interfaces/enums'
import { IPriceData } from '@interfaces/interfaces/prices/index'
import { type IDashboardTokens } from '@interfaces/interfaces/ui/index'
import { FILTERS } from '@static/index'
import { capitalizeFirstLetter, shortAddress } from '@utils/index'
import { Component, For } from 'solid-js'

export interface IProps {
  totalBalance: Record<BLOCKCHAIN, string>
  prices: Record<string, IPriceData>
  data: IDashboardTokens[]
  banners: string[]
  username: string
  balance: string
  percent: number
  profit: number
}

export const Dashboard: Component<IProps> = (props) => {
  return (
    <div class="overflow-x-auto pr-16 h-full">
      <div class="mb-12 flex flex-col gap-4">
        <Typography color="white" text="h2">
          Overview
        </Typography>
        <Typography color="lightBlue" text="caption">
          Good to see you again, {props.username}
        </Typography>
      </div>
      <div class="flex flex-col gap-48">
        <PortfolioBalance balance={props.balance} profit={props.profit} percent={props.percent} />
        <div class="flex flex-col gap-12">
          <For each={props.data}>
            {(data) => (
              <div class="flex flex-col gap-12">
                <AssetSummary
                  chain={capitalizeFirstLetter(data.chain)}
                  allocation={data.tokens.length.toString()}
                  balance={props.totalBalance[data.chain] ?? '----'}
                />
                <table class="table">
                  <thead>
                    <tr class="border-black-300">
                      <For each={FILTERS.slice(0, 2)}>
                        {(item) => (
                          <th>
                            <Typography text="caption">{item}</Typography>
                          </th>
                        )}
                      </For>
                      <th />
                      <th />
                      <For each={FILTERS.slice(-2)}>
                        {(item) => (
                          <th class="text-end">
                            <Typography text="caption">{item}</Typography>
                          </th>
                        )}
                      </For>
                    </tr>
                  </thead>
                  <tbody>
                    <For each={data.tokens}>
                      {(token) => (
                        <tr class="border-black-300 hover:bg-black-400">
                          <td class="p-12">
                            <div class="flex items-center gap-6">
                              <div class="avatar">
                                <div class="mask rounded-100 min-h-32 max-h-32 min-w-32">
                                  <img src={token.img} alt="img" />
                                </div>
                              </div>
                              <div>
                                <Typography text="caption" class="font-bold" color="lightBlue">
                                  {token.label}
                                </Typography>
                                <Typography
                                  text="caption"
                                  class="opacity-80 font-bold"
                                  color="lightBlue">
                                  {shortAddress(token.address)}
                                </Typography>
                              </div>
                            </div>
                          </td>
                          <td>
                            <Typography text="caption" color="white">
                              {props.prices[token.address]?.balance ?? '----'}
                            </Typography>
                          </td>
                          <th />
                          <th />
                          <td class="text-end">
                            <Typography text="caption" color="white">
                              {props.prices[token.address]?.price ?? '----'}
                            </Typography>
                          </td>
                          <th class="text-end">
                            <Typography text="caption" color="white">
                              {props.prices[token.address]?.value ?? '----'}
                            </Typography>
                          </th>
                        </tr>
                      )}
                    </For>
                  </tbody>
                </table>
              </div>
            )}
          </For>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
