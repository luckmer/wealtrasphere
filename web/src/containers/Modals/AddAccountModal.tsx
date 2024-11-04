import DefaultButton from "@components/buttons/DefaultButton/Index";
import IconButton from "@components/buttons/IconButton/Index";
import Dropdown from "@components/Dropdown/Dropdown/Index";
import DropdownList from "@components/Dropdown/DropdownList/Index";
import DefaultInput from "@components/Inputs/DefaultInput/Index";
import { Modal } from "@components/Modal/Index";
import Progressbar from "@components/Progressbar/Index";
import Typography from "@components/Typography/Index";
import {
  ACCOUNT_TYPE,
  ADD_ACCOUNT,
  BLOCKCHAIN,
  MODAL_TYPE,
} from "@interfaces/enums";
import { INewAccount } from "@interfaces/interfaces";
import { uiSelector } from "@store/ui/selectors";
import { setOpenModal } from "@store/ui/ui";
import { invoke } from "@tauri-apps/api";
import theme from "@theme/theme";
import { isOnCurve } from "@utils/Solana/Index";
import { RiArrowsArrowDownSLine } from "solid-icons/ri";
import { createMemo, createSignal, Match, Show, Switch } from "solid-js";
import { v7 } from "uuid";

const AddAccountModal = () => {
  const [step, setStep] = createSignal<ADD_ACCOUNT>(ADD_ACCOUNT.INIT);
  const [stepIndex, setStepIndex] = createSignal<number>(0);
  const [revert, setRevert] = createSignal<boolean>(false);
  const [invalidAddress, setInvalidAddress] = createSignal<boolean>(false);
  const [loading, setLoading] = createSignal<boolean>(false);

  const [accountType, setAccountType] = createSignal<ACCOUNT_TYPE | undefined>(
    undefined
  );
  const [accountName, setAccountName] = createSignal<string | undefined>(
    undefined
  );
  const [accountAddress, setAccountAddress] = createSignal<string | undefined>(
    undefined
  );

  const progressbarStep = createMemo(() => {
    return {
      [ADD_ACCOUNT.INIT]: 1,
      [ADD_ACCOUNT.ACCOUNT_NAME]: 2,
      [ADD_ACCOUNT.ADDRESS]: 3,
      [ADD_ACCOUNT.UPLOAD]: 4,
    };
  });

  const enableNextStep = createMemo(() => {
    if (progressbarStep()[step()] === 1 && accountType() === undefined) {
      return false;
    }
    if (progressbarStep()[step()] === 2 && accountName() === undefined) {
      return false;
    }

    if (
      progressbarStep()[step()] === 3 &&
      (accountAddress() === undefined ||
        (accountAddress() !== undefined && invalidAddress()))
    ) {
      return false;
    }

    return true;
  });

  return (
    <Modal
      isActive={uiSelector.openModal().type === MODAL_TYPE.ADD_ACCOUNT}
      label="Add accounts"
      isSending={false}
      disabled={false}
      id="id"
      onClickCloseModal={() => {
        if (loading()) return;
        setOpenModal({ open: false, type: MODAL_TYPE.NONE });
      }}
    >
      <div class="flex flex-col gap-24">
        <Progressbar step={progressbarStep()[step()]} />
        <Switch>
          <Match when={step() === ADD_ACCOUNT.INIT}>
            <div class="flex flex-col gap-12">
              <Typography text="body" color="white">
                Account Type
              </Typography>
              <Typography text="caption" color="white">
                Choose an account type to define your investment profile.
              </Typography>
              <Dropdown
                onFocusOut={() => {
                  setRevert(false);
                }}
              >
                <IconButton
                  reverse
                  styles="bg-black-400 outline-none min-h-[50px]"
                  title={accountType() ?? "Select account type"}
                  color="white"
                  onClick={() => {
                    if (revert()) return;
                    setRevert(true);
                  }}
                >
                  <RiArrowsArrowDownSLine
                    class="transition-rotate duration-[250ms]"
                    color={theme.colors.white[100]}
                    size={24}
                    classList={{
                      "rotate-0": !revert(),
                      "rotate-180": revert(),
                    }}
                  />
                </IconButton>
                <DropdownList
                  data={Object.values(ACCOUNT_TYPE)}
                  onClick={(name) => {
                    const elem: Element | null = document.activeElement;
                    if (elem instanceof HTMLElement) {
                      elem?.blur();
                    }
                    if (name === accountType()) return;
                    setAccountType(name);
                  }}
                  activeElement={accountType() ?? ""}
                />
              </Dropdown>
            </div>
          </Match>
          <Match when={step() === ADD_ACCOUNT.ACCOUNT_NAME}>
            <div class="flex flex-col gap-12">
              <Typography text="body" color="white">
                Account Type
              </Typography>
              <Typography text="caption" color="white">
                Choose an account type to define your investment profile.
              </Typography>
              <DefaultInput
                value={accountName() ?? ""}
                placeholder="Account name"
                onChange={(value) => {
                  setAccountName(value);
                }}
              />
            </div>
          </Match>
          <Match when={step() === ADD_ACCOUNT.ADDRESS}>
            <div class="flex flex-col gap-12">
              <Typography text="body" color="white">
                Setup address
              </Typography>
              <div class="flex flex-row justify-between">
                <Typography text="caption" color="white">
                  Drop wallet address. (Solana).
                </Typography>
                <Show when={invalidAddress()}>
                  <Typography text="caption" color="red">
                    Invalid address
                  </Typography>
                </Show>
              </div>
              <DefaultInput
                value={accountAddress() ?? ""}
                placeholder="Account Address"
                error={invalidAddress() ? "Invalid address" : undefined}
                onChange={(value) => {
                  if (!value) {
                    setAccountAddress(undefined);
                    setInvalidAddress(false);
                    return;
                  }

                  try {
                    setInvalidAddress(false);
                    isOnCurve(value);
                  } catch {
                    setInvalidAddress(true);
                  }
                  setAccountAddress(value);
                }}
              />
            </div>
          </Match>
          <Match when={step() === ADD_ACCOUNT.UPLOAD}>
            <div class="flex flex-col gap-12">
              <Typography text="body" color="white">
                Almost there!
              </Typography>
              <Typography text="caption" color="white">
                Click Confirm to finish process and create your account.
              </Typography>
            </div>
          </Match>
        </Switch>
        <div class="flex flex-row w-full justify-end gap-12">
          <DefaultButton
            title={step() === ADD_ACCOUNT.INIT ? "Cancel" : "Back"}
            color="white"
            disabled={loading()}
            text="caption"
            onClick={() => {
              if (step() === ADD_ACCOUNT.INIT) {
                setOpenModal({ open: false, type: MODAL_TYPE.NONE });
                return;
              }

              const steps = Object.keys(
                progressbarStep()
              ) as unknown as ADD_ACCOUNT[];
              const currentStep: ADD_ACCOUNT | undefined =
                steps[stepIndex() - 1];

              if (!currentStep) return;

              setStepIndex(stepIndex() - 1);
              setStep(currentStep);
            }}
          />
          <DefaultButton
            loading={loading()}
            title={step() !== ADD_ACCOUNT.UPLOAD ? "Continue" : "Confirm"}
            active={enableNextStep() && !loading()}
            disabled={!enableNextStep() || loading()}
            text="caption"
            onClick={async () => {
              if (step() === ADD_ACCOUNT.UPLOAD) {
                setLoading(true);
                const newAccount: INewAccount = {
                  account_address: accountAddress() ?? "",
                  chain: BLOCKCHAIN.SOLANA,
                  account_type: accountType() ?? ACCOUNT_TYPE.BLOCKCHAIN,
                  account_name: accountName() ?? "Default account",
                  id: v7(),
                };

                await invoke("create_account", { newAccount });

                setLoading(false);
                // setOpenModal({ open: false, type: MODAL_TYPE.NONE });
                return;
              }

              const steps = Object.keys(
                progressbarStep()
              ) as unknown as ADD_ACCOUNT[];
              const currentStep: ADD_ACCOUNT | undefined =
                steps[stepIndex() + 1];
              if (!currentStep) return;

              setStepIndex(stepIndex() + 1);
              setStep(currentStep);
            }}
          />
        </div>
      </div>
    </Modal>
  );
};

export default AddAccountModal;
