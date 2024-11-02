import { ADD_ACCOUNT, MODAL_TYPE } from "@interfaces/enums";
import { uiSelector } from "@store/ui/selectors";
import { Modal } from "@components/Modal/Index";
import { setOpenModal } from "@store/ui/ui";
import Progressbar from "@components/Progressbar/Index";
import { createMemo, createSignal, Match, Switch } from "solid-js";
import DefaultButton from "@components/buttons/DefaultButton/Index";
import Typography from "@components/Typography/Index";

const AddAccountModal = () => {
  const [step, setStep] = createSignal<ADD_ACCOUNT>(ADD_ACCOUNT.INIT);
  const [stepIndex, setStepIndex] = createSignal(0);

  const progressbarStep = createMemo(() => {
    return {
      [ADD_ACCOUNT.INIT]: 1,
      [ADD_ACCOUNT.ACCOUNT_NAME]: 2,
      [ADD_ACCOUNT.ADDRESS]: 3,
      [ADD_ACCOUNT.UPLOAD]: 4,
    };
  });

  return (
    <Modal
      label="Add accounts"
      disabled={false}
      isSending={false}
      id="id"
      isActive={uiSelector.openModal().type === MODAL_TYPE.ADD_ACCOUNT}
      onClickCloseModal={() => {
        setOpenModal({ open: false, type: MODAL_TYPE.NONE });
      }}
    >
      <div class="flex flex-col gap-24">
        <Progressbar step={progressbarStep()[step()]} />
        <Switch>
          <Match when={step() === ADD_ACCOUNT.INIT}>
            <div class="flex flex-col gap-6">
              <Typography text="body" color="white">
                Account Type
              </Typography>
              <Typography text="caption" color="white">
                Choose an account type to define your investment profile.
              </Typography>
            </div>
          </Match>
          <Match when={step() === ADD_ACCOUNT.ACCOUNT_NAME}>
            <div class="flex flex-col gap-6">
              <Typography text="body" color="white">
                Account Name
              </Typography>
              <Typography text="caption" color="white">
                Choose a name for your account portfolio.
              </Typography>
            </div>
          </Match>
          <Match when={step() === ADD_ACCOUNT.ADDRESS}>
            <div class="flex flex-col gap-6">
              <Typography text="body" color="white">
                Setup address or csv file
              </Typography>
              <Typography text="caption" color="white">
                Drop wallet address or upload a csv file.
              </Typography>
            </div>
          </Match>
          <Match when={step() === ADD_ACCOUNT.UPLOAD}>
            <div class="flex flex-col gap-6">
              <Typography text="body" color="white">
                Almost there!
              </Typography>
              <Typography text="caption" color="white">
                Click Upload to finish process
              </Typography>
            </div>
          </Match>
        </Switch>
        <div class="flex flex-row w-full justify-end gap-12">
          <DefaultButton
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
            title={step() === ADD_ACCOUNT.INIT ? "Cancel" : "Back"}
            color="white"
            text="caption"
          />
          <DefaultButton
            onClick={() => {
              const steps = Object.keys(
                progressbarStep()
              ) as unknown as ADD_ACCOUNT[];
              const currentStep: ADD_ACCOUNT | undefined =
                steps[stepIndex() + 1];
              if (!currentStep) return;

              setStepIndex(stepIndex() + 1);
              setStep(currentStep);
            }}
            title="Continue"
            active
            text="caption"
          />
        </div>
      </div>
    </Modal>
  );
};

export default AddAccountModal;
