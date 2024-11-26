import IconButton from '@components/buttons/IconButton/Index'
import RoundedButton from '@components/buttons/RoundedButton/Index'
import Typography from '@components/Typography/Index'
import { NAVIGATION } from '@interfaces/enums/index'
import { AiOutlineHome } from 'solid-icons/ai'
import { VsAccount, VsSettings } from 'solid-icons/vs'
import { Component, createSignal } from 'solid-js'
import theme from '@theme/theme'

export interface IProps {
  navigation: string
  onClick: (navigation: NAVIGATION) => void
}

const Sidebar: Component<IProps> = (props) => {
  const [rotate, setRotate] = createSignal<boolean>(true)
  const [showButton, setShowButton] = createSignal(false)
  const [showText, setShowText] = createSignal(true)

  return (
    <div
      class="h-full bg-black-400 p-24 flex flex-col relative transition-width duration-[350ms] ease-in-out"
      classList={{ 'w-[250px]': rotate(), 'w-[96px]': !rotate() }}
      onMouseLeave={() => setShowButton(false)}
      onMouseEnter={() => setShowButton(true)}
      onTransitionEnd={(e) => {
        if (e.propertyName !== 'width') return
        if (rotate()) {
          setShowText(true)
        }
      }}>
      <div
        class="absolute top-48 -translate-y-1/2 right-[-20px] transition-opacity duration-[350ms] ease-in-out"
        classList={{
          'opacity-0 invisible': !showButton(),
          'opacity-100 visible': showButton(),
        }}>
        <RoundedButton
          rotate={!rotate()}
          onclick={() => {
            setRotate((prev) => !prev)
            setShowText(false)
          }}
        />
      </div>
      <div class="pt-30 flex flex-col h-full">
        <div
          class="transition-opacity duration-[350ms] ease-in-out pb-[12px]"
          classList={{
            'w-[0px] opacity-0 invisible': !showText(),
          }}>
          <Typography color="white" text="tinyBold">
            NAVIGATION
          </Typography>
        </div>
        <div class="h-full flex flex-col justify-between">
          <div class="flex flex-col gap-[6px] justify-center">
            <IconButton
              color={props.navigation === NAVIGATION.DASHBOARD ? 'white' : 'grey'}
              onClick={() => {
                props.onClick(NAVIGATION.DASHBOARD)
              }}
              active={props.navigation === NAVIGATION.DASHBOARD}
              class="group-hover:text-white-100"
              hideText={!showText()}
              title="Dashboard">
              <AiOutlineHome
                class="group-hover:fill-purple-200"
                size={21}
                fill={props.navigation === NAVIGATION.DASHBOARD ? theme.colors.purple[200] : 'grey'}
              />
            </IconButton>
            <IconButton
              color={props.navigation === NAVIGATION.ACCOUNTS ? 'white' : 'grey'}
              onClick={() => {
                props.onClick(NAVIGATION.ACCOUNTS)
              }}
              active={props.navigation === NAVIGATION.ACCOUNTS}
              class="group-hover:text-white-100"
              hideText={!showText()}
              title="Accounts">
              <VsAccount
                class="group-hover:fill-purple-200"
                size={21}
                fill={props.navigation === NAVIGATION.ACCOUNTS ? theme.colors.purple[200] : 'grey'}
              />
            </IconButton>
          </div>
          <IconButton
            color={props.navigation === NAVIGATION.SETTINGS ? 'white' : 'grey'}
            onClick={() => {
              props.onClick(NAVIGATION.SETTINGS)
            }}
            active={props.navigation === NAVIGATION.SETTINGS}
            class="group-hover:text-white-100"
            hideText={!showText()}
            title="Settings">
            <VsSettings
              class="group-hover:fill-purple-200"
              size={21}
              fill={props.navigation === NAVIGATION.SETTINGS ? theme.colors.purple[200] : 'grey'}
            />
          </IconButton>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
