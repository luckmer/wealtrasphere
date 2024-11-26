export type IEventType = FocusEvent & {
  currentTarget: HTMLDivElement
  target: Element
}

export type IEventInput = InputEvent & {
  currentTarget: HTMLInputElement
  target: HTMLInputElement
}
